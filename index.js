const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/:board', function (req, res) {
  res.render('index');
});

function onConnection(socket) {
  socket.on('join room', function (roomName) {
    socket.join(roomName);
  });

  socket.on('drawing', function (data) {
    socket.broadcast.emit('drawing', data);
    console.log(data);
  });

  socket.on('rectangle', function (data) {
    socket.broadcast.emit('rectangle', data);
    console.log(data);
  });

  socket.on('linedraw', function (data) {
    socket.broadcast.emit('linedraw', data);
    console.log(data);
  });

  socket.on('circledraw', function (data) {
    socket.broadcast.emit('circledraw', data);
    console.log(data);
  });

  socket.on('ellipsedraw', function (data) {
    socket.broadcast.emit('ellipsedraw', data);
    console.log(data);
  });

  socket.on('textdraw', function (data) {
    socket.broadcast.emit('textdraw', data);
    console.log(data);
  });

  socket.on('copyCanvas', function (data) {
    socket.broadcast.emit('copyCanvas', data);
    console.log(data);
  });

  socket.on('Clearboard', function (data) {
    socket.broadcast.emit('Clearboard', data);
    console.log(data);
  });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
