const express = require('express');
const router = express.Router();

router.use(function(req, res, next){
   req.extension = "dude";
   next();
});

router.get('/', (req, res) =>{
    res.json({url: 'https://orange-board.herokuapp.com/' + req.extension});
});

module.exports = router;