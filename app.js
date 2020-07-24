var express = require('express');
const expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

var app = express();

// 解析application/json
app.use(bodyParser.json());

// 解析application/x-www-form-urlencoded，從網頁表單送來的資料
app.use(bodyParser.urlencoded({extended: true}));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/db', require('./routes/db.js'));

var PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});