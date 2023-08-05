const User = require("../models/User");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Song = require("../models/Song");
const { fetchSong, fetchAlbum, fetchArtist } = require("../config/helper");

//! Artist favorites endpoints (artistId)
const addArtist = async (req, res) => {
    const { id } = req.params;
    let artist = await Artist.findOne({ artistId: id });
    if (!artist) artist = await Artist.create({ artistId: id });
    artist.favoritesCount += 1;
    await artist.save();
    const user = await User.findByIdAndUpdate(req.user.id, { $addToSet: { "favorites.artists": id } }, { new: true });
    return res.json(user.favorites.artists);
};

const removeArtist = async (req, res) => {
    const { id } = req.params;
    let artist = await Artist.findOne({ artistId: id });
    if (!artist) artist = await Artist.create({ artistId: id });
    if (artist.favoritesCount > 0) artist.favoritesCount -= 1;
    await artist.save();
    const user = await User.findByIdAndUpdate(req.user.id, { $pull: { "favorites.artists": id } }, { new: true });
    return res.json(user.favorites.artists);
};
//! Album favorites endpoints (collectionId)
const addAlbum = async (req, res) => {
    const { id } = req.params;
    let album = await Album.findOne({ albumId: id });
    if (!album) album = await Album.create({ albumId: id });
    album.favoritesCount += 1;
    await album.save();
    const user = await User.findByIdAndUpdate(req.user.id, { $addToSet: { "favorites.albums": id } }, { new: true });
    console.log(user);
    return res.json(user.favorites.albums);
};

const removeAlbum = async (req, res) => {
    const { id } = req.params;
    let album = await Album.findOne({ albumId: id });
    if (!album) album = await Album.create({ albumId: id });
    if (album.favoritesCount > 0) album.favoritesCount -= 1;
    await album.save();
    const user = await User.findByIdAndUpdate(req.user.id, { $pull: { "favorites.albums": id } }, { new: true });
    return res.json(user.favorites.albums);
};
//! Artist favorites endpoints (trackId)
const addSong = async (req, res) => {
    const { id } = req.params;
    let song = await Song.findOne({ songId: id });
    if (!song) song = await Song.create({ songId: id });
    song.favoritesCount += 1;
    await song.save();
    const user = await User.findByIdAndUpdate(req.user.id, { $addToSet: { "favorites.songs": id } }, { new: true });
    return res.json(user.favorites.songs);
};

const removeSong = async (req, res) => {
    const { id } = req.params;
    let song = await Song.findOne({ songId: id });
    if (!song) song = await Song.create({ songId: id });
    if (song.favoritesCount > 0) song.favoritesCount -= 1;
    await song.save();
    const user = await User.findByIdAndUpdate(req.user.id, { $pull: { "favorites.songs": id } }, { new: true });
    return res.json(user.favorites.songs);
};

const Trending = async (req, res) => {
    const trendingSongs = await Song.find().sort({ favoritesCount: -1 }).limit(5);
    const trendingAlbums = await Album.find().sort({ favoritesCount: -1 }).limit(5);
    const trendingArtists = await Artist.find().sort({ favoritesCount: -1 }).limit(5);

    const songs = await Promise.all(trendingSongs.map(fetchSong));
    const albums = await Promise.all(trendingAlbums.map(fetchAlbum));
    const artists = await Promise.all(trendingArtists.map(fetchArtist));

    return res.json({ songs, albums, artists });
};

const getPreferences = async (req, res) => {
    return res.json(req.user.favorites.preferences);
};

//! primaryGenreName
const postPreferences = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.id, { $addToSet: { "favorites.preferences.genres": req.body.genre } }, { new: true });
    return res.json(user.favorites.preferences);
};
module.exports = { addArtist, removeArtist, addAlbum, removeAlbum, addSong, removeSong, Trending, getPreferences, postPreferences };
