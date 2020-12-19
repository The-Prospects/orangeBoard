const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
require('dotenv').config();
const { App } = require('@slack/bolt');

const bot = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

(async () => {
  // Start the app
  await bot.start(process.env.PORT_SLACK || 4000);
  console.log('⚡️ Bolt app is running!');
})();

http.listen(port, () => console.log('listening on port ' + port));

// Gives the response
bot.event("app_mention", async ({ context, event }) => {

  try{
    await bot.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      text: `Hello <@${event.user}> you mentioned me. Here is the link for your Orange Board:`
    });
  }
  catch (e) {
    console.log(`error responding ${e}`);
  }

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


