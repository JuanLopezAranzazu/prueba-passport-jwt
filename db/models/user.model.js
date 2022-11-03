const { Model, DataTypes, Sequelize } = require("sequelize");
const USER_TABLE = "user";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  fullname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  maxSalary: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.salaries.reduce((salary, item) => {
        if (salary < item.value) salary = item.value;
        return salary;
      }, this.salaries[0].value);
    },
  },
  minSalary: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.salaries.reduce((salary, item) => {
        if (salary > item.value) salary = item.value;
        return salary;
      }, this.salaries[0].value);
    },
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Salary, {
      foreignKey: "userId",
      as: "salaries",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
