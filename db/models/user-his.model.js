const { Model, DataTypes, Sequelize } = require("sequelize");
const USER_HIS_TABLE = "user_his";
const { USER_TABLE } = require("./user.model");

const UserHisSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
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
  fullname: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
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
};

class UserHis extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_HIS_TABLE,
      modelName: "UserHis",
      timestamps: false,
    };
  }
}

module.exports = { USER_HIS_TABLE, UserHisSchema, UserHis };
