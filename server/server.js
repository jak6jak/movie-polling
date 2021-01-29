require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error)=> console.log(error));
db.once('open', () => console.log('Connected to Database!'))

server.use(express.json());
server.use(cors());

const router = require('./pollPage');
server.use('/pollPage', router);

server.listen(3000, () => console.log("server started!"))