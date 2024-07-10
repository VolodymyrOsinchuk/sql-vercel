require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: true,
});

// async () => {
//   try {
//     await sequelize.sync();
//     console.log("Connection has been established successfully");
//   } catch (error) {
//     console.error("Unable to authenticate to the database", error);
//   }
// };

module.exports = sequelize;
