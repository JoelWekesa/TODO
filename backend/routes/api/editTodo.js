const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { Todos } = require("../../models/Todos");
const { secrets } = require("../../config/secrets");

const router = Router();

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content } = req.body;
		const token = req.headers["x-access-token"];
		await jwt.verify(token, secrets, async (err, results) => {
			await Todos.findByPk(id)
				.then((todo) => {
					if (results.id !== todo.user) {
						return res.status(403).json({
							error: "You do not have permission to perform this action.",
						});
					}

					todo
						.update({
							title: title ? title : todo.title,
							content: content ? content : todo.content,
						})
						.then((todo) => {
							return res.status(200).json({
								message: "Successfully updated todo",
								todo,
							});
						})
						.catch((err) => {
							return res.status(500).json({
								error: err.message,
							});
						});
				})
				.catch((err) => {
					return res.status(404).json({
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
	editTodo: router,
};
