require("dotenv").config();
// const pg = require("pg");
// const { Pool } = pg;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  // host: "ep-calm-snow-a2kwy1no-pooler.eu-central-1.aws.neon.tech",
  // operatorsAliases: false,
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

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// pool.connect((err) => {
//   if (err) throw err;
//   console.log("Connection to postgres succeeded");
// });

module.exports = sequelize;
// module.exports = pool;
