const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

class UserHisService {
  constructor() {}

  async findAll() {
    const users = await models.UserHis.findAll({
      attributes: { exclude: "password" },
    });
    return users;
  }

  async findById(id) {
    const user = await models.UserHis.findByPk(id, {});
    if (!user) {
      throw boom.notFound(`User ${id} not found`);
    }
    delete user.dataValues.password;
    return user;
  }

  async create(payload) {
    const savedUser = await models.UserHis.create(payload);
    delete savedUser.dataValues.password;
    return savedUser;
  }
}

module.exports = UserHisService;
