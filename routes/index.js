const express = require('express');
const router = express.Router();
var fs = require("fs");
var file = "./score.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// gameRule
router.get('/', (req, res) => {
    res.render('gameRule', {

    })
});

// gameStart
router.get('/gameStart', (req, res) => {
    var scoreTable = new Array();

    db.serialize(() => {
        var query = "SELECT rowid AS id, class, name, score FROM score WHERE class = 'A';";
        console.log(query);

        db.all(query, (err, rows) => {
            scoreTable = rows;
            res.render('gameStart', {
                scoreTable
            });
        });

    });

});

// solutions
router.get('/solutions', (req, res) => {
    res.render('solutions', {

    });
})

module.exports = router;
