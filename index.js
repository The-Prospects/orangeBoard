// express setup
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
// page routing
const authRoutes = require('./routes/auth-routes');
//const profileRoutes = require('./routes/profile-routes');
// auth
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
// database
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');

// networking
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log('listening on port ' + port));
const io = require('socket.io')(server, { wsEngine: 'ws' });
const { v4: uuidV4 } = require('uuid');

// set view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,    // 1 day in ms
  keys: keys.session.cookieKey,
}))

// initalize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoose database
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  console.log('database connected');
  if(err){
    console.log(err);
  }
});

// use auth routes
app.use('/auth', authRoutes);

// use profile routes
// app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

// Random id appends to '/' route and redirects to '/:board' route
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

// boardId created from req.params or random id from '/' redirect
app.get('/:board', function (req, res) {
  res.render('index', { boardId: req.params.board });
});

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
