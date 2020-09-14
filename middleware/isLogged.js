const item = require("../models/item");

var middlewareScript = {
	// Authentication //
	isLoggedIn: (req, res, next) => {
	if(req.isAuthenticated()) {
		return next();
	}
		console.log("error", "Access Denied! Please log in!");
		res.redirect("/login");
	},
}

module.exports = middlewareScript;