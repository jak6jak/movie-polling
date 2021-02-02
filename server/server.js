require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const enableWs = require('express-ws');
enableWs(server);

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error)=> console.log(error));
db.once('open', () => console.log('Connected to Database!'))

server.use(express.json());
server.use(cors());

const router = require('./pollPage');
server.use('/pollPage', router);

server.ws('/Results/:id', function(ws) {
    ws.on('message', function(msg) {

        ws.send(msg);
    })
})

server.listen(process.env.PORT || 3000, () => console.log("server started!"))