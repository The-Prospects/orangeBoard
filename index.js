const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/:board', function (req, res) {
  res.render('index', { boardId: req.params.board });
});

io.on('connection', (socket) => {
  socket.on('join', (boardId) => {
    socket.join(boardId);
    socket.on('drawing', function (data) {
      socket.to(boardId).broadcast.emit('drawing', data);
      console.log(data);
    });

    socket.on('rectangle', function (data) {
      socket.to(boardId).broadcast.emit('rectangle', data);
      console.log(data);
    });

    socket.on('linedraw', function (data) {
      socket.to(boardId).broadcast.emit('linedraw', data);
      console.log(data);
    });

    socket.on('circledraw', function (data) {
      socket.to(boardId).broadcast.emit('circledraw', data);
      console.log(data);
    });

    socket.on('ellipsedraw', function (data) {
      socket.to(boardId).broadcast.emit('ellipsedraw', data);
      console.log(data);
    });

    socket.on('textdraw', function (data) {
      socket.to(boardId).broadcast.emit('textdraw', data);
      console.log(data);
    });

    socket.on('copyCanvas', function (data) {
      socket.to(boardId).broadcast.emit('copyCanvas', data);
      console.log(data);
    });

    socket.on('Clearboard', function (data) {
      socket.to(boardId).broadcast.emit('Clearboard', data);
      console.log(data);
    });
  });
});

http.listen(port, () => console.log('listening on port ' + port));
