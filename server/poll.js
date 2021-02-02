const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    pollName: String,
    maxVotes: Number,
    numberofPeopleVoted: Number,
    movieList: [{
        movies: String,
        votes: Number

    }]
})

module.exports = mongoose.model('poll', pollSchema);