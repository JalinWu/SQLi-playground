var fs = require("fs");
var file = "./test.db";

//載入 sqlite3
var sqlite3 = require("sqlite3").verbose();
//new 一個 sqlite 的 database，檔案是 test.db
var db = new sqlite3.Database(file);

db.serialize(function () {
    //db.run 如果 Staff 資料表不存在，那就建立 Staff 資料表
    db.run("CREATE TABLE IF NOT EXISTS  Stuff (thing TEXT)");
    var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

    //寫進10筆資料
    for (var i = 0; i < 10; i++) {
        stmt.run("staff_number" + i);
    }

    stmt.finalize();

    var q1 = "'staff_number0';";
    var query1 = `SELECT rowid AS id, thing FROM Stuff WHERE thing = ${q1}`;
    console.log("query1: ", query1);

    var q2 = "staff_number0";
    var query2 = `SELECT rowid AS id, thing FROM Stuff WHERE thing = ?`;
    console.log("query2: ", query2);

    //   var q1x = "'staff_number0'; DELETE FROM Stuff;";
    var q1x = `'staff_number0'; DELETE FROM Stuff; INSERT INTO Stuff VALUES ("staff_number0"); INSERT INTO Stuff VALUES ("staff_number0");`;
    var query1x = `SELECT rowid AS id, thing FROM Stuff WHERE thing = ${q1x}`;
    console.log("query1x: ", query1x);

    var queries = query1x.split(";");

    for (var i = 1; i < queries.length; i++) {
        if (queries[i]) {
            console.log(queries[i]);
            db.run(queries[i]);
        }
    }

    db.each(queries[0], function (err, row) {
        //log 出所有的資料
        console.log(row.id + ": " + row.thing);
    });
});

db.close();