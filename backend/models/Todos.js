const { Sequelize } = require("sequelize");
const { db } = require("../db/db");

const Todos = db.define("todos", {
	user: {
		type: Sequelize.INTEGER,
	},
	title: {
		type: Sequelize.STRING,
	},
	content: {
		type: Sequelize.STRING,
	},
});

module.exports = {
	Todos,
};
