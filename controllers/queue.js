const { fetchSong } = require("../config/helper");
const Queue = require("../models/Queue");

//! Create a Queue
const CreateQueue = async (req, res) => {
    let queue = await Queue.findOne({ name: req.body.name });
    if (!queue) queue = await Queue.create({ name: req.body.name });
    req.body.songs.map((trackId) => {
        if (!queue.songs.includes(trackId)) queue.songs.push(trackId);
    });
    await queue.save();
    return res.status(201).json(queue);
};

//! Get all Queues
const AllQueue = async (req, res) => {
    const queues = await Queue.find();
    return res.json(queues);
};

//! Get a specific Queue
const SpecificQueue = async (req, res) => {
    const queue = await Queue.findById(req.params.id);
    if (!queue) return res.status(404).json({ error: "Queue not found." });
    const songs = await Promise.all(queue.songs.map(fetchSong));
    const data = { name: playlist.name, songs: songs };
    return res.json(data);
};

//! Update a Queue
const UpdateQueue = async (req, res) => {
    const queue = await Queue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!queue) return res.status(404).json({ error: "Queue not found." });
    return res.json(queue);
};

//! Delete a Queue
const DeleteQueue = async (req, res) => {
    const queue = await Queue.findByIdAndDelete(req.params.id);
    if (!queue) return res.status(404).json({ error: "Queue not found." });
    return res.sendStatus(204);
};

//! Add a song to a Queue
const AddSong = async (req, res) => {
    const queue = await Queue.findById(req.params.id);
    if (!queue) return res.status(404).json({ error: "Queue not found." });
    if (!queue.songs.includes(req.body.songId)) queue.songs.push(req.body.songId);
    await queue.save();
    return res.json(queue);
};

//! Remove a song from a Queue
const RemoveSong = async (req, res) => {
    const queue = await Queue.findById(req.params.id);
    if (!queue) return res.status(404).json({ error: "Queue not found." });
    queue.songs = queue.songs.filter((item) => item !== Number(req.params.songId));
    await queue.save();
    return res.json(queue);
};

//! Rearrange the order of songs in a Queue
const Rearrange = async (req, res) => {
    const queue = await Queue.findById(req.params.id);
    if (!queue) return res.status(404).json({ error: "Queue not found." });
    queue.songs = req.body.songIds;
    await queue.save();
    return res.json(queue);
};

module.exports = { CreateQueue, AllQueue, SpecificQueue, AddSong, UpdateQueue, DeleteQueue, RemoveSong, Rearrange };
