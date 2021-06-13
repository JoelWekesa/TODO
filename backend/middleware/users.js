const { Users } = require("../models/Users");

existingUserName = (req, res, next) => {
	try {
		const { username } = req.body;
		if (!username) {
			return res.status(400).json({
				error: "Please provide a username",
			});
		}
		Users.findOne({
			where: {
				username,
			},
		})
			.then((user) => {
				if (user) {
					return res.status(500).json({
						error: "A user with that username already exists",
					});
				}
				next();
			})
			.catch((err) => {
				return res.status(500).json({
					error: err.message,
				});
			});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

existingEmail = (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({
				error: "Please provide an email",
			});
		}
		Users.findOne({
			where: {
				email,
			},
		})
			.then((user) => {
				if (user) {
					return res.status(500).json({
						error: "A user with that email already exists",
					});
				}
				next();
			})
			.catch((err) => {
				return res.status(500).json({
					error: err.message,
				});
			});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

passwordCheck = (req, res, next) => {
	try {
		const { password, password1 } = req.body;
		if (!password) {
			return res.status(400).json({
				error: "Please enter a password.",
			});
		}
		if (!password1) {
			return res.status(400).json({
				error: "Please confirm password.",
			});
		}
		if (password !== password1) {
			return res.status(400).json({
				error: "Passwords did not match.",
			});
		}

		next();
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	existingUserName,
	existingEmail,
	passwordCheck,
};
