const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    // song properties...
    artistId: { type: Number, required: true },
    favoritesCount: { type: Number, default: 0 },
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
