const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        default: "",
    },
    favorites: {
        artists: { type: [Number], default: [] },
        albums: { type: [Number], default: [] },
        songs: { type: [Number], default: [] },
        preferences: { genres: [String], playbackOptions: String },
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
