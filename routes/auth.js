const { Register, Login, GoogleLogin, FacebookLogin, Logout, VerifyEmail, PasswordResetRequest, PasswordResetForm, PasswordResetConfirm } = require("../controllers/auth");
const passport = require("passport");
const router = require("express").Router();

router.post("/register", Register);
router.get("/local/verify/:token", VerifyEmail);
router.post("/local/reset-password", PasswordResetRequest);
router.get("/local/reset-password/:token", PasswordResetForm);
router.post("/local/reset-password/:token", PasswordResetConfirm);
router.post("/login", passport.authenticate("local"), Login);
router.post("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google"), GoogleLogin);
router.post("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook"), FacebookLogin);
router.post("/logout", Logout);

module.exports = router;
