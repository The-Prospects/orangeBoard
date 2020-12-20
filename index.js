const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log('listening on port ' + port));
const io = require('socket.io')(server, { wsEngine: 'ws' });
const { v4: uuidV4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Random id appends to '/' route and redirects to '/:board' route
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

// boardId created from req.params or random id from '/' redirect
app.get('/:board', function (req, res, next) {
  res.render('index', { boardId: req.params.board });
  next();
});

// bot api information
app.get('/:board/botapi', function (req, res){
  res.json({url: 'https://orange-board.herokuapp.com/' + req.params.board})
})

// Create new board with form value
app.post('/create', function (req, res) {
  console.log(req.body.board);
  res.redirect(`/${req.body.board}`);
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
