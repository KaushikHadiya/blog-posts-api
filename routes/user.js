const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users.js");


//SIGNUP
router.route("/signup")
    .get(usersController.renderSignup)
    .post(saveRedirectUrl, wrapAsync(usersController.signup));

//LOGIN
router.route("/login")
    .get(usersController.renderLogin)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
        wrapAsync(usersController.login)
    );

//LOGOUT
router.get("/logout", usersController.logout);
module.exports = router;
