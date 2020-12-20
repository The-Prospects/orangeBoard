// express setup
const express = require('express');
const app = express();
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

// set view engine
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

app.use(express.static(__dirname + '/public'));

function onConnection(socket) {
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