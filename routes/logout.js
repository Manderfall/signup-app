const express = require("express");
const router = express.Router();
const passport = require ("passport");
const localStrategy = require ("passport-local");
const passportLocalMongoose = require ("passport-local-mongoose");
const middleware = require("../middleware/isLogged")


router.get('/logout', middleware.isLoggedIn,function(req, res) {
        console.log("logging out!");
        req.logout();
        res.redirect("login");
});

module.exports = router;