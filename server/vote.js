const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    movieList: [String]
})

module.exports = mongoose.model('vote', VoteSchema);