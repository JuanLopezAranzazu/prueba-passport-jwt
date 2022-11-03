const { Model, DataTypes, Sequelize } = require("sequelize");
const SALARY_HIS_TABLE = "salary_his";
const { USER_TABLE } = require("./user.model");
const { SALARY_TABLE } = require("./salary.model");

const SalaryHisSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  salaryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SALARY_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  value: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  startDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  endDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class SalaryHis extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: SALARY_HIS_TABLE,
      modelName: "SalaryHis",
      timestamps: false,
    };
  }
}

module.exports = { SALARY_HIS_TABLE, SalaryHisSchema, SalaryHis };
