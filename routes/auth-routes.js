const router = require('express').Router();

// auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
  res.render('logout');
});

// auth with slack
router.get('/slack', (req, res) => {
  res.render('logging in with slack');
});

module.exports = router;