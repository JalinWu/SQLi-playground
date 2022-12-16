const express = require('express');
const router = express.Router();
var fs = require("fs");
var file = "./score.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// reset
router.get('/reset', (req, res) => {
    var scoreTable = new Array();

    db.serialize(() => {
        // 如果 score 資料表不存在，那就建立 score 資料表
        db.run("CREATE TABLE IF NOT EXISTS  score (class TEXT, name TEXT, score INTEGER)");

        // 清空 score 資料表
        db.run("DELETE from score");

        // 塞入 default data
        var sqlInsertDefault = db.prepare("INSERT INTO score VALUES (?, ?, ?)");
        sqlInsertDefault.run("A", "Andy", 80);
        sqlInsertDefault.run("A", "Eric", 85);
        sqlInsertDefault.run("A", "Hank", 75);
        sqlInsertDefault.run("A", "David", 90);
        sqlInsertDefault.run("A", "Olivia", 88);
        sqlInsertDefault.run("B", "Henry", 90);
        sqlInsertDefault.run("B", "Kevin", 95);
        sqlInsertDefault.run("B", "Alice", 80);
        sqlInsertDefault.run("B", "James", 86);
        sqlInsertDefault.run("B", "Kenny", 88);
        sqlInsertDefault.run("C", "Kevin", 92);
        sqlInsertDefault.run("C", "Linda", 80);
        sqlInsertDefault.run("C", "Joe", 65);
        sqlInsertDefault.run("C", "Sam", 70);
        sqlInsertDefault.run("C", "May", 75);

        sqlInsertDefault.finalize();

        var query = "SELECT rowid AS id, class, name, score FROM score WHERE class = 'A'";
        console.log(query);

        db.all(query, (err, rows) => {
            console.log(rows);
            scoreTable = rows;
            res.send(
                scoreTable
            );
        })
    })

});

// search
router.post('/search', (req, res) => {
    const { name } = req.body;

    db.serialize(() => {
        // 依姓名做搜尋
        var query = "SELECT rowid AS id, class, name, score FROM score WHERE class = 'A' and name = ?";
        console.log(query);

        var queries = query.split(';');
        for (var i = 0; i < queries.length; i++) {

            if (queries[i]) {
                var q = queries[i].trim().split(' ');

                if (q[0].toLowerCase() == 'select') {
                    db.each(queries[i], name, function (err, row) {
                        try {
                            console.log(row.id + ": " + row.class + " | " + row.name + " | " + row.score);
                        } catch (error) {
                            console.log("Oops, Something went wrong.");
                        }
                    });
                } else if (q[0].toLowerCase() == 'insert' || q[0].toLowerCase() == 'update' || q[0].toLowerCase() == 'delete') {
                    db.run(queries[i], name);
                }

            }

        }
        db.all(queries[0], name, (err, rows) => {
            res.send(rows);
        })

    })
})

module.exports = router;
