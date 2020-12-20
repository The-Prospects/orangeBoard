const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchemea = new Schema({
  username: String,
  slackID: String
});

const User = mongoose.model('user', userSchemea);

module.exports = User;