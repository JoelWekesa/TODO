const { Router } = require("express");
const { Todos } = require("../../models/Todos");

const router = Router();

router.get("/", async (req, res) => {
	try {
		const { page, size } = req.query;
		await Todos.findAndCountAll({
			limit: size,
			offset: page * size,
			order: [["id", "DESC"]],
		})
			.then((todos) => {
				let previousPage = 0;
				let nextPage = 0;
				const currentPage = parseInt(page) + 1;
				const totalPages = Math.ceil(todos.count / size);
				if (totalPages === currentPage) {
					nextPage = "N/A";
				} else {
					nextPage = currentPage + 1;
				}
				if (currentPage === 1) {
					previousPage = "N/A";
				} else {
					previousPage = currentPage - 1;
				}
				return res.status(200).json({
					message: `Successfully fetched page ${currentPage} of ${totalPages} of all todos`,
					previousPage: previousPage,
					currentPage: currentPage,
					nextPage: nextPage,
					totalPages: totalPages,
					todos,
				});
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
});

module.exports = {
	allTodos: router,
};
