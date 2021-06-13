const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize(
	process.env.database,
	process.env.user,
	process.env.password,
	{
		host: process.env.host,
		dialect: "postgres",
	}
);

module.exports = {
	db,
};
