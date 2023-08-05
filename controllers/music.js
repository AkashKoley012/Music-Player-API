const { fetchSongs } = require("../config/helper");

const music = async (req, res) => {
    const songs = await fetchSongs(req.body.searchItem);
    return res.status(200).json(songs);
};

module.exports = { music };
