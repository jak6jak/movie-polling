const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Poll = require('./poll')
const axios = require('axios');
const { io } = require('socket.io-client');

router.get('/', async (req, res) => {
    try {
        const poll = await Poll.find();
        res.json(poll);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/fetchMovie/:query', async (req, res) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMD_API_KEY}&language=en-US&query=${encodeURIComponent(req.params.query)}&page=1&include_adult=false`)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        })

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
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:id', async (req, res) => {
    console.log(req.body);
    if (req.body.movieList.length > 0) {
        const objectIDArray = req.body.movieList.map(s => mongoose.Types.ObjectId(s))
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
            
            req.io.to(req.params.id).emit('update');
            res.status(201).json(doc);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: err.message })
        }
    }
})

module.exports = router