const jwt = require("jsonwebtoken");
const { secrets } = require("../config/secrets");
const { Users } = require("../models/Users");
const { Todos } = require("../models/Todos");

const contentCheck = (req, res, next) => {
	try {
		const { title, content } = req.body;
		if (!title) {
			return res.status(400).json({
				error: "No title provided.",
			});
		}
		if (!content) {
			return res.status(400).json({
				error: "No content provided.",
			});
		}
		next();
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

const isSuperUser = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).json({
				error: "No access token provided.",
			});
		}

		await jwt.verify(token, secrets, async (err, results) => {
			if (err) {
				return res.status(403).json({
					error: "Invalid token.",
				});
			}

			const { id } = results;
			await Users.findByPk(id).then((user) => {
				if (!user.isSuperUser) {
					return res.status(403).json({
						error: "You are not authorized to perform this action.",
					});
				}
				next();
			});
		});
	} catch (err) {
		return res.json(err.message);
	}
};

const todoUser = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).json({
				error: "No access token provided.",
			});
		}

		await jwt.verify(token, secrets, (err, results) => {
			if (err) {
				return res.status(403).json({
					error: err.message,
				});
			}
			next();
		});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	contentCheck,
	isSuperUser,
	todoUser,
};
