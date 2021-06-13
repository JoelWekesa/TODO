const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Todos } = require("../../models/Todos");
const { secrets } = require("../../config/secrets");

const router = Router();

router.post("/", (req, res) => {
	try {
		const { title, content } = req.body;
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).json({
				error: "No access token provided.",
			});
		}

		jwt.verify(token, secrets, (err, results) => {
			if (err) {
				return res.status(403).json({
					error: "Invalid token.",
				});
			}
			const { id } = results;
			Todos.create({
				user: id,
				title,
				content,
			})
				.then((todo) => {
					return res.status(200).json({
						message: "Successfully created a todo.",
						todo,
					});
				})
				.catch((err) => {
					return res.status(500).json({
						error: err.message,
					});
				});
		});
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
});

module.exports = {
	newTodoAPI: router,
};
