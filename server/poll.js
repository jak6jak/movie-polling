const mongoose = require('mongoose');

// const movieSchema = new mongoose.Schema({
//     votes: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     }
// })

const pollSchema = new mongoose.Schema({
    pollName: String,
    maxVotes: Number,
    movieList: [{
        movies: String,
        votes: Number

    }]
})

module.exports = mongoose.model('poll', pollSchema);