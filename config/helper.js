const axios = require("axios");

const fetchSongs = async (searchTerm) => {
    // Make a request to the iTunes Search API to fetch the music data
    const response = await axios.get("https://itunes.apple.com/search", {
        params: {
            term: searchTerm,
            entity: "song",
            limit: 10,
        },
    });
    return response.data.results;
};

// const fetchPlaylistSongs = async (songTrackIds) => {
//     const songs = [];

//     await Promise.all(songTrackIds.map(fetchSong));
//     console.log(songs);
//     return songs;
// };

const fetchSong = async (data) => {
    const response = await axios.get(`https://itunes.apple.com/lookup?id=${encodeURIComponent(data.songId)}&entity=song`);
    const song = response.data.results[0];
    return song;
};

const fetchAlbum = async (data) => {
    const response = await axios.get(`https://itunes.apple.com/lookup?id=${data.albumId}&entity=album`);
    const album = response.data.results[0];
    return album;
};

const fetchArtist = async (data) => {
    const response = await axios.get(`https://itunes.apple.com/lookup?id=${data.artistId}&entity=musicArtist`);
    const artist = response.data.results[0];
    return artist;
};

module.exports = { fetchSongs, fetchSong, fetchAlbum, fetchArtist };
