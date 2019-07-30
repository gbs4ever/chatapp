const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//test
app.get('/', function (req, res) {
  res.render('index.ejs');
});

io.sockets.on('connection', function (socket) {
  socket.on('username', function (username) {
    socket.username = username;
    io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
  });

  socket.on('disconnect', function (username) {
    io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
  })

  socket.on('chat_message', function (message) {
    io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  });

});

let server_port = process.env.YOUR_PORT || process.env.PORT || 80;
let server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function () {
  console.log('Listening on port %d', server_port);
});