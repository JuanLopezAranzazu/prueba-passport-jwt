const { Model, DataTypes, Sequelize } = require("sequelize");
const SALARY_TABLE = "salary";
const { USER_TABLE } = require("./user.model");

const SalarySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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

class Salary extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: SALARY_TABLE,
      modelName: "Salary",
      timestamps: false,
    };
  }
}

module.exports = { SALARY_TABLE, SalarySchema, Salary };
