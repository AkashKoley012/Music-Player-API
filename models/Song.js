const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    // song properties...
    songId: { type: Number, required: true },
    favoritesCount: { type: Number, default: 0 },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
