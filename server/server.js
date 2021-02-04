require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const enableWs = require('express-ws');
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
enableWs(server);

const mongoose = require('mongoose');
mongoose.connect(${_self.DATABASE_URL}, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error)=> console.log(error));
db.once('open', () => console.log('Connected to Database!'))

server.use(express.json());
server.use(cors());
server.use(history());

const router = require('./pollPage');
server.use('/pollPage', router);

server.use(serveStatic('../dist'))

server.ws('/Results/:id', function(ws) {
    ws.on('message', function(msg) {

        ws.send(msg);
    })
})

server.listen(process.env.PORT || 3000, () => console.log("server started!"))