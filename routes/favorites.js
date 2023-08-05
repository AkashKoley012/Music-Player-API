const { addArtist, removeArtist, addAlbum, removeAlbum, addSong, removeSong, Trending, getPreferences, postPreferences } = require("../controllers/favorites");
const router = require("express").Router();

router.post("/favorites/artist/:id", addArtist);
router.delete("/favorites/artist/:id", removeArtist);

router.post("/favorites/album/:id", addAlbum);
router.delete("/favorites/album/:id", removeAlbum);

router.post("/favorites/song/:id", addSong);
router.delete("/favorites/song/:id", removeSong);

router.get("/trending", Trending);

router.get("/preferences", getPreferences);
router.post("/preferences", postPreferences);

module.exports = router;
