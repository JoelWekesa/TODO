const pageCheck = (req, res, next) => {
	try {
		const { page, size } = req.query;

		if (isNaN(page) || isNaN(size) || page < 0 || size > 1000) {
			return res.status(400).json({
				error: "Invalid page or size attributes.",
			});
		}

		next();
	} catch (err) {
		return res.status(500).json({
			error: err.message,
		});
	}
};

module.exports = {
	pageCheck,
};
