const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Poll = require('./poll')

router.get('/', async (req, res) => {
    try {
        const poll = await Poll.find();
        res.json(poll);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        let poll = await Poll.findOne({ _id: req.params.id });
        res.json(poll)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const poll = new Poll({
        pollName: req.body.pollName,
        maxVotes: req.body.maxVotes,
        movieList: req.body.MovieList,
        numberofPeopleVoted: 0,
    });
    try {
        const newPoll = await poll.save();
        res.status(201).json(newPoll);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:id', async (req, res) => {
    console.log(req.body);
    const objectIDArray = req.body.movieList.map(s => mongoose.Types.ObjectId(s))
    console.log(mongoose.Types.ObjectId.isValid(objectIDArray[0]));
    try {
        const doc = await Poll.findById(req.params.id);
        doc.numberofPeopleVoted += 1;

        objectIDArray.forEach(element => {
            for (let i = 0; i < doc.movieList.length; i++) {
                if (doc.movieList[i]._id.equals(element)) {
                    doc.movieList[i].votes += 1;
                    break;
                }
            }
        });
        console.log(doc);
        await doc.save();
        res.status(201).json(doc);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
})

module.exports = router