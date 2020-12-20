const { serializeUser } = require('passport');
const passport = require('passport');
const SlackStrategy = require('passport-slack-oauth2').Strategy;
const User = require('../models/user-model');
const keys = require('./keys');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((user, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new SlackStrategy({
    // options for strategy
    callbackURL: '/auth/slack/redirect',
    clientID: keys.slack.clientID,
    clientSecret: keys.slack.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
   // check if user already exists
    User.findOne({slackID: profile.id}).then((currentUser) => {
      if(currentUser){
        // already have user
        console.log('user is: ', currentUser);
        done(null, currentUser);
      }else{
        // no user found
        new User({
          username: profile.displayName,
          slackID: profile.id,
        }).save().then((newUser) => {
          console.log('new user created:' + newUser);
          done(null, newUser);
        });
      }
    })
  })
)