const express = require("express");
const router = express.Router();
const middleware = require("../middleware/isLogged")
router.get("/success",middleware.isLoggedIn, (req, res) => {
	res.render("success");
});

module.exports = router;
