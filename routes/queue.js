const express = require("express");
const router = express.Router();
const { CreateQueue, AllQueue, UpdateQueue, DeleteQueue, SpecificQueue, AddSong, RemoveSong, Rearrange } = require("../controllers/queue");

router.post("/queues", CreateQueue);
router.get("/queues", AllQueue);
router.get("/queues/:id", SpecificQueue);
router.put("/queues/:id", UpdateQueue);
router.delete("/queues/:id", DeleteQueue);
router.post("/queues/:id/songs", AddSong);
router.delete("/queues/:id/songs/:songId", RemoveSong);
router.put("/queues/:id/songs/reorder", Rearrange);

module.exports = router;
