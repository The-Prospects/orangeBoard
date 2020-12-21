const router = require('express').Router();
const passport = require('passport');


// auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
  res.render('logout');
});

// auth with slack
router.get('/slack', passport.authenticate('Slack'));

// callback auth with slack
router.get('/slack/redirect', passport.authenticate('Slack'), (req, res) => {
  res.redirect('/');    // print response
});

module.exports = router;