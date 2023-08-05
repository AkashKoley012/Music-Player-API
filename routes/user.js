const passport = require("passport");
const { Profile } = require("../controllers/user");
const router = require("express").Router();

router.post("/profile", passport.isAuth, Profile);

module.exports = router;
