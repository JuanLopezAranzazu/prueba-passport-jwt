const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

class SalaryHisService {
  constructor() {}

  async findAll() {
    const salaries = await models.SalaryHis.findAll({});
    return salaries;
  }

  async findById(id) {
    const salary = await models.SalaryHis.findByPk(id, {});
    if (!salary) {
      throw boom.notFound(`Salary ${id} not found`);
    }
    return salary;
  }

  async create(payload) {
    const savedSalary = await models.SalaryHis.create(payload);
    return savedSalary;
  }
}

module.exports = SalaryHisService;
