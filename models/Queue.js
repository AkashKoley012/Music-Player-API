const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

const Queue = mongoose.model("Queue", queueSchema);

module.exports = Queue;
