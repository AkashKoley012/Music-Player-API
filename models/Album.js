const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    // song properties...
    albumId: { type: Number, required: true },
    favoritesCount: { type: Number, default: 0 },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
