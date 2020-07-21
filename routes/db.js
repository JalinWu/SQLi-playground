const express = require('express');
const router = express.Router();
var fs = require("fs");
var file = "./score.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// reset
router.get('/reset', (req, res) => {
    db.serialize(() => {
        // 如果 score 資料表不存在，那就建立 score 資料表
        db.run("CREATE TABLE IF NOT EXISTS  score (class TEXT, name TEXT, score INTEGER)");

        // 清空 score 資料表
        db.run("DELETE from score");

        // 塞入 default data
        var sqlInsertDefault = db.prepare("INSERT INTO score VALUES (?, ?, ?)");
        sqlInsertDefault.run("A", "Andy", 80);
        sqlInsertDefault.run("A", "Eric", 85);
        sqlInsertDefault.run("A", "Mary", 75);
        sqlInsertDefault.run("B", "John", 90);
        sqlInsertDefault.run("B", "Kevin", 95);
        sqlInsertDefault.run("B", "Linda", 80);

        sqlInsertDefault.finalize();

        // var q1 = "Andy' or 1=1; '";
        // var query = "SELECT rowid AS id, class, name, score FROM score WHERE class = 'A' and name = '" + q1 + "'";
        var query = "SELECT rowid AS id, class, name, score FROM score WHERE class = 'A'";
        console.log(query);

        db.each(query, function (err, row) {
            //log 出所有的資料
            console.log(row.id + ": " + row.class + " | " + row.name + " | " + row.score);
        });
    })

    res.send('Hello World!');
});

// search
router.post('/search', (req, res) => {
    const { name } = req.body;

    db.serialize(() => {
        var query = "SELECT rowid AS id, class, name, score FROM score WHERE class = 'A' and name = '" + name + "'";
        // var query = "SELECT rowid AS id, class, name, score FROM score WHERE class = 'A' and name = ?";
        console.log(query);

        var queries = query.split(';');
        for (var i = 0; i < queries.length; i++) {

            if (queries[i]) {
                var q = queries[i].trim().split(' ');

                if (q[0].toLowerCase() == 'select') {
                    db.each(queries[i], function (err, row) {
                        console.log(row.id + ": " + row.class + " | " + row.name + " | " + row.score);
                    });
                } else if (q[0].toLowerCase() == 'insert' || q[0].toLowerCase() == 'update' || q[0].toLowerCase() == 'delete') {
                    db.run(queries[i]);
                }

            }

        }

    })
    res.send('Hello World!');
})

module.exports = router;
