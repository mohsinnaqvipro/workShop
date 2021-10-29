const Sequelize = require("sequelize");
const connection = {};
const config = require("../config/config.json");
// const dotenv = require("dotenv");
// dotenv.config();

const sequelize = new Sequelize(
  // process.env.DATABASE,
  // process.env.USERNAME,
  // process.env.PASSWORD,
  config.development.database,
  config.development.username,
  config.development.password,
  {
    // dialect: process.env.DIALECT,
    // host: process.env.HOST,
    dialect: config.development.dialect,
    host: config.development.config,
    port: 3306,
    retry: {
      match: [/ETIMEDOUT/],
      max: 2,
    },
    dialectOptions: {
      connectTimeout: 150000,
    },
  }
);
module.exports = async () => {
  if (connection.isConnected) {
    console.log("=> Existing connection.");
    return { sequelize, Sequelize };
  }
  // console.log(process.env);
  // await sequelize.sync();
  await sequelize.authenticate();
  const Op = Sequelize.Op;
  connection.isConnected = true;
  console.log("=> Created a new connection.");
  return { sequelize, Sequelize, Op };
};
