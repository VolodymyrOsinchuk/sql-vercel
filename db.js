require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectModule: require("pg"),
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});

module.exports = sequelize;
