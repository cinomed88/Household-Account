var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'pp1'
});

app.use('/css', express.static('static/css'));
app.use('/img', express.static('static/img'));
app.use('/js', express.static('static/js'));

app.get('/', (req, res) => {
    let indexPage = fs.readFileSync('./static/index.html', 'utf8');
    res.send(indexPage);
});

app.get('/ajax-GET-record', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    let qs = 'SELECT time, description, expense, img1, img2 FROM record';
    let qsQuery = mysql.format(qs, ["time", "description", "expense", "img1", "img2"]);
    connection.query(qsQuery, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        res.send(data);
    })

});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.post('/post-submit', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("Stuff sent to server", req.body);
    res.send(["Saved:", req.body]);
    var sql = "INSERT INTO record VALUES (null, Now(), '" 
        +req.body.description+"', '"+req.body.expense+"', null, null)";
  
    connection.query(sql, function (err, results, fields) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(results);

    });
    
});

var port = 8001;
app.listen(port, () => {
    console.log("This app is listening on port " + port + "!");
});