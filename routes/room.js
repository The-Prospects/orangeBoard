const express = require('express');
const router = express.Router();

router.get('/:boardId', (req, res) =>{
    res.render('index');
    console.log(req.params);
});

module.exports = router;