const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../../models/Users");
const { secrets } = require("../../config/secrets");

const loginAPI = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (username && password) {
			await Users.findOne({
				where: {
					username,
				},
			}).then((user) => {
				if (!user) {
					return res.status(404).json({
						error: "We could not find a user with the provided username.",
					});
				}

				const validPassword = bcrypt.compareSync(password, user.password);
				if (!validPassword) {
					return res.status(400).json({
						error: "Invalid password.",
					});
				}

				const token = jwt.sign({ id: user.id }, secrets, {
					expiresIn: "1d",
				});

				return res.status(200).json({
					message: "Login was successful",
					accessToken: token,
					user,
				});
			});
		} else {
			res.status(400).json({
				error: "Please provide an email and password to login.",
			});
		}
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	loginAPI,
};
