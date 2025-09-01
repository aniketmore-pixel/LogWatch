const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const Watcher = require('./watcher');

const watcher = new Watcher("test.log");
watcher.start();

// Serve static files (index.html, styles.css, client.js, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page at /log
app.get('/log', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Send initial logs when client connects
io.on('connection', (socket) => {
    console.log("New connection:", socket.id);

    // Send initial last 10 lines
    socket.emit("init", watcher.getLogs());
});

// Emit new log updates to all connected clients
watcher.on("process", (updatedLogs) => {
    io.emit("update-log", updatedLogs);
});

http.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
