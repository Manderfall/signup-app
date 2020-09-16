const express = require("express");
const router = express.Router();
const passport = require ("passport");
const localStrategy = require ("passport-local");
const passportLocalMongoose = require ("passport-local-mongoose");
const User = require("../models/user");

/* general */
router.get("/", (req, res) => {
	res.render("login");
});
/* ------------------ */

/* registration */
router.get("/newUser", (req, res) => {
	res.render("newUser");
});

router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err) {
			if(err.name == "UserExistsError") {
				return res.render("newUser", {"error": "username taken"});
			} else {
				console.log(err);
				return res.render("newUser", {"error": err});
			}
		}
				passport.authenticate("local")(req, res, () => {
			res.redirect("/");
		});
		
	});

});
/* ------------------ */

/* login/logout */
router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
		successRedirect: "/success",
		failureRedirect: "/login"
	}), (req, res) => {
	// Handled by middleware.
});

router.get("/logout", (req, res) => {
	req.logout(); // Destroys all user data in the session.
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}
/* ------------------ */

module.exports = router;