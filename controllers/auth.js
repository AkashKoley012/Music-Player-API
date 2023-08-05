const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { sendEmail } = require("../config/nodemailer");
const User = require("../models/User");

const Register = async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    //! Generate a random token for verify email
    const token = require("crypto").randomBytes(20).toString("hex");
    req.body.token = token;
    console.log(req.body);
    const user = await User.create(req.body);
    const url = `http://localhost:3000/api/local/verify/${token}`;
    sendEmail(user.email, "Verify Email", url);
    return res.status(200).json(user);
};

//! Route for email verification
const VerifyEmail = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ error: "Verification token not found" });
    user.isVerified = true;
    user.token = "";
    await user.save();
    return res.json({ message: "Email verified successfully" });
};

//! Route for password reset request
const PasswordResetRequest = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    //! Generate a random token for password reset
    const token = require("crypto").randomBytes(20).toString("hex");
    user.token = token;

    //! Send password reset email
    const resetLink = `http://localhost:3000/api/local/reset-password/${token}`;
    const emailText = `Click the following link to reset your password: ${resetLink}`;
    sendEmail(email, "Password Reset", emailText);
    return res.json({ message: "Password reset email sent successfully" });
};

//! Route for password reset form (front-end can use this route to render a form)
const PasswordResetForm = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ error: "Password reset token not found" });
    //! Return the token to the front-end
    return res.json({ token });
};

//! Route for password reset confirmation
const PasswordResetConfirm = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ error: "Password reset token not found" });
    //! Update the user's password
    user.password = await bcrypt.hash(password, 10);
    user.verificationToken = "";
    await user.save();
    return res.json({ message: "Password reset successful" });
};

const Login = async (req, res) => {
    return res.status(200).json(req.user);
};

const GoogleLogin = async (req, res) => {
    return res.status(200).json(req.user);
};

const FacebookLogin = async (req, res) => {
    return res.status(200).json(req.user);
};

const Logout = async (req, res) => {
    req.logout();
    res.status(200).json({ message: "Logout Successful" });
};

module.exports = { Register, VerifyEmail, PasswordResetRequest, PasswordResetForm, PasswordResetConfirm, Login, GoogleLogin, FacebookLogin, Logout };
