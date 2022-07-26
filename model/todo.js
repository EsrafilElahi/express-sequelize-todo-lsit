const { DataTypes } = require("sequelize");
const sequelize = require("../db/connectDB");

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true, // default is true
  },
});

module.exports = Todo;
