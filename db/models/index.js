const { User, UserSchema } = require("./user.model");
const { Salary, SalarySchema } = require("./salary.model");
const { UserHis, UserHisSchema } = require("./user-his.model");
const { SalaryHis, SalaryHisSchema } = require("./salary-his.model");

function models(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Salary.init(SalarySchema, Salary.config(sequelize));
  UserHis.init(UserHisSchema, UserHis.config(sequelize));
  SalaryHis.init(SalaryHisSchema, SalaryHis.config(sequelize));
  User.associate(sequelize.models);
  Salary.associate(sequelize.models);
  UserHis.associate(sequelize.models);
  SalaryHis.associate(sequelize.models);
}

module.exports = models;
