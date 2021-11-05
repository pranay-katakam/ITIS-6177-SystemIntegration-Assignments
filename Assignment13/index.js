const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require('path');


app.get('/', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'index.html'
    res.sendFile(fileName, options);
});

io.on('connection', (socket) => {
    console.log('A user connected');
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('Chat message', (msg) => {
        console.log('Message: ' + msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
    socket.broadcast.emit('Hii');
});

io.on('connection', (socket) => {
    socket.on('Chat message =>', (msg) => {
        io.emit('Chat message =>', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on server - 3000');
});