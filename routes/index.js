const express = require('express');
const router = express.Router();
var fs = require("fs");
var file = "./score.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// gameRule
router.get('/', (req, res) => {
    res.render('gameRule', {
        gameRuleActive: "active",
        gameStartActive: "",
        solutionsActive: ""
    })
});

// gameStart
router.get('/gameStart', (req, res) => {
    var scoreTable = new Array();

    db.serialize(() => {
        var query = "SELECT rowid AS id, class, name, score FROM score WHERE class = 'A';";
        console.log(query);

        db.all(query, (err, rows) => {
            if(rows){
                scoreTable = rows;
            } else {
                scoreTable = [];
            }
            
            res.render('gameStart', {
                scoreTable,
                gameRuleActive: "",
                gameStartActive: "active",
                solutionsActive: ""
            });
        });

    });

});

// solutions
router.get('/solutions', (req, res) => {
    res.render('solutions', {
        gameRuleActive: "",
        gameStartActive: "",
        solutionsActive: "active"
    });
})

module.exports = router;
