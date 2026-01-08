const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware");
const usrController=require("../controllers/users")


//signup page
router
.route("/signup")
.get(usrController.renderSignup)
.post(
  wrapAsync(usrController.signup)
);


router.route("/login")
.get(usrController.renderLogin)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    usrController.login
)


//logout
router.get("/logout",usrController.logout);
module.exports = router;
