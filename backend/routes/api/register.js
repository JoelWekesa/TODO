const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { Users } = require("../../models/Users");

const router = Router();

router.post("/", async (req, res) => {
	try {
		const { username, email, password } = req.body;
		await Users.create({
			username,
			email,
			password: bcrypt.hashSync(password, 10),
		})
			.then((user) => {
				return res.status(200).json({
					message: "Successfully registered a user",
					user,
				});
			})
			.catch((err) => {
				return res.status(500).json({
					message: err.message,
				});
			});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = {
	registerAPI: router,
};
