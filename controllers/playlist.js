const { fetchSong } = require("../config/helper");
const Playlist = require("../models/Playlist");

//! Create a playlist
const CreatePlaylist = async (req, res) => {
    let playlist = await Playlist.findOne({ name: req.body.name });
    if (!playlist) playlist = await Playlist.create({ name: req.body.name });
    req.body.songs.map((trackId) => {
        if (!playlist.songs.includes(trackId)) playlist.songs.push(trackId);
    });
    await playlist.save();
    return res.status(201).json(playlist);
};

//! Get all playlists
const AllPlaylist = async (req, res) => {
    const playlists = await Playlist.find();
    return res.json(playlists);
};

//! Get a specific playlist
const SpecificPlaylist = async (req, res) => {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found." });
    const songs = await Promise.all(playlist.songs.map(fetchSong));
    const data = { name: playlist.name, songs: songs };
    return res.json(data);
};

//! Update a playlist
const UpdatePlaylist = async (req, res) => {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!playlist) return res.status(404).json({ error: "Playlist not found." });
    return res.json(playlist);
};

//! Delete a playlist
const DeletePlaylist = async (req, res) => {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found." });
    return res.sendStatus(204);
};

//! Add a song to a playlist
const AddSong = async (req, res) => {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found." });
    if (!playlist.songs.includes(req.body.songId)) playlist.songs.push(req.body.songId);
    await playlist.save();
    return res.json(playlist);
};

//! Remove a song from a playlist
const RemoveSong = async (req, res) => {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found." });
    playlist.songs = playlist.songs.filter((item) => item !== Number(req.params.songId));
    await playlist.save();
    return res.json(playlist);
};

//! Rearrange the order of songs in a playlist
const Rearrange = async (req, res) => {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found." });
    playlist.songs = req.body.songIds;
    await playlist.save();
    return res.json(playlist);
};

module.exports = { CreatePlaylist, AllPlaylist, SpecificPlaylist, AddSong, UpdatePlaylist, DeletePlaylist, RemoveSong, Rearrange };
