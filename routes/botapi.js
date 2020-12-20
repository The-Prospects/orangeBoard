const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.json({url: 'https://orange-board.herokuapp.com/'});
});

module.exports = router;