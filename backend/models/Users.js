const { Sequelize } = require("sequelize");
const { db } = require("../db/db");

const Users = db.define("users", {
	username: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	isSuperUser: {
		type: Sequelize.BOOLEAN,
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
	},
});

module.exports = {
	Users,
};
