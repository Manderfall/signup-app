const express = require("express");
const router = express.Router();

router.get("/newUser", (req, res) => {
	res.render("newUser");
});

module.exports = router;