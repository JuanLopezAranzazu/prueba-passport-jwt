const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

const SalaryHisService = require("./salary-his.service");
const salaryHisService = new SalaryHisService();

class SalaryService {
  constructor() {}

  async findAll() {
    const salaries = await models.Salary.findAll({
      include: [{ model: models.User, as: "user" }],
    });
    return salaries;
  }

  async findById(id) {
    const salary = await models.Salary.findByPk(id, {
      include: [{ model: models.User, as: "user" }],
    });
    if (!salary) {
      throw boom.notFound(`Salary ${id} not found`);
    }
    return salary;
  }

  async create(payload) {
    const savedSalary = await models.Salary.create(payload);
    return savedSalary;
  }

  async update(id, payload) {
    const salary = await this.findById(id);
    const salaryForHis = salary;
    if (!salary) throw boom.notFound(`Salary #${id} not found`);
    const updatedSalary = await salary.update(payload);
    if (updatedSalary) {
      const { id, value, startDate, endDate, userId } = salaryForHis;
      const dataForSalaryHis = {
        salaryId: id,
        value,
        startDate,
        endDate,
        userId,
      };
      await salaryHisService.create(dataForSalaryHis);
    }
    return updatedSalary;
  }

  async delete(id) {
    const salary = await this.findById(id);
    if (!salary) throw boom.notFound(`Salary #${id} not found`);
    await salary.destroy();
    return id;
  }
}

module.exports = SalaryService;
