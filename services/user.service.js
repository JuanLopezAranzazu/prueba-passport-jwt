const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UserHisService = require("./user-his.service");
const userHisService = new UserHisService();

class UserService {
  constructor() {}

  async findAll() {
    const users = await models.User.findAll({
      attributes: { exclude: "password" },
      include: [{ model: models.Salary, as: "salaries" }],
    });
    return users;
  }

  async findByRole(role, dataForExclude) {
    const users = await models.User.findAll({
      where: { role },
      attributes: { exclude: dataForExclude },
      include: [{ model: models.Salary, as: "salaries" }],
    });
    return users;
  }

  async findByUsername(username) {
    const user = await models.User.findOne({
      where: { username },
    });
    return user;
  }

  async findById(id, deletePassword = true) {
    const user = await models.User.findByPk(id, {
      include: [{ model: models.Salary, as: "salaries" }],
    });
    if (!user) {
      throw boom.notFound(`User ${id} not found`);
    }
    if (deletePassword) delete user.dataValues.password;
    return user;
  }

  async create(payload) {
    const { password } = payload;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const savedUser = await models.User.create({
      ...payload,
      password: passwordHash,
    });
    delete savedUser.dataValues.password;
    return savedUser;
  }

  async update(id, payload) {
    const { password } = payload;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await this.findById(id);
    const userForHis = await this.findById(id, false);
    if (!user) throw boom.notFound(`User #${id} not found`);
    const updatedUser = await user.update({
      ...payload,
      password: passwordHash,
    });
    if (updatedUser) {
      const { id, fullname, username, password, role } = userForHis;
      const dataForUserHis = {
        userId: id,
        fullname,
        username,
        password,
        role,
      };
      console.log(dataForUserHis);
      await userHisService.create(dataForUserHis);
    }
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findById(id);
    if (!user) throw boom.notFound(`User #${id} not found`);
    await user.destroy();
    return id;
  }
}

module.exports = UserService;
