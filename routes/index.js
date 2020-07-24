const express = require('express');
const router = express.Router();

// gameRule
router.get('/', (req, res) =>{
    res.render('gameRule', {
        
    })
});

// gameStart
router.get('/gameStart', (req, res) => {
    res.render('gameStart', {

    });
})

// solutions
router.get('/solutions', (req, res) => {
    res.render('solutions', {

    });
})

module.exports = router;
