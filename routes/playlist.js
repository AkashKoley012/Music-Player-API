const express = require("express");
const router = express.Router();
const { CreatePlaylist, AllPlaylist, UpdatePlaylist, DeletePlaylist, SpecificPlaylist, AddSong, RemoveSong, Rearrange } = require("../controllers/playlist");

router.post("/playlists", CreatePlaylist);
router.get("/playlists", AllPlaylist);
router.get("/playlists/:id", SpecificPlaylist);
router.put("/playlists/:id", UpdatePlaylist);
router.delete("/playlists/:id", DeletePlaylist);
router.post("/playlists/:id/songs", AddSong);
router.delete("/playlists/:id/songs/:songId", RemoveSong);
router.put("/playlists/:id/songs/reorder", Rearrange);

module.exports = router;
