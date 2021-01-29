const express= require('express')
const router = express.Router();
const Poll = require('./poll')

router.get('/', async (req,res) => {
    try {
        const poll = await Poll.find();
        res.json(poll);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.post('/', async (req,res) => {
    console.log(req.body);
    const poll = new Poll( {
        pollName: req.body.name,
        movieList: req.body.movieList
    });
    try {
        const newPoll = await poll.save();
        res.status(201).json(newPoll);
    } catch ( err ) {
        res.status(400).json({message: err.message});
    }
})

module.exports = router