require('dotenv').config();
const express = require('express');
const server = express();
const http = require('http').createServer(server);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
        origin: process.env.APP_URL,
        methods: ["GET", "POST"]
    }
});

const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error)=> console.log(error));
db.once('open', () => console.log('Connected to Database!'))

server.use(express.json());
server.use(cors());
server.use(history());
server.use(function(req,res,next){
    req.io = io;
    next();
});


io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on("subscribe", (arg) => {
        console.log(arg);
        socket.join(arg);
    })

})

const router = require('./pollPage');
server.use('/pollPage', router);

server.use(serveStatic('../dist'))

http.listen(process.env.PORT || 3000, () => console.log("server started!"))