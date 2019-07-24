var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var multer = require('Multer');
var app = express();
// var router = express.Router();

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
app.use(bodyParser.json()); // parse application/json
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    let indexPage = fs.readFileSync('./static/index.html', 'utf8');
    res.send(indexPage);
});



app.get('/ajax-GET-record', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    let qs = "SELECT time, description, expense, img FROM record WHERE DATE(time) = DATE(NOW())";
    let qsQuery = mysql.format(qs, ["time", "description", "expense", "img"]);
    connection.query(qsQuery, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    })

});

///////////////////////img upload/////////////////////////////////////////

var Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./tempImages");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
var upload = multer({ storage: Storage }).array("imgUploader", 1); //Field name and max count

app.post('/uploadImage', (req, res) => {
    upload(req, res, (err) => {
        console.log(req.files[0].path);
        if (err) {
            console.log(err);
            return;
        }
        var imgsql = "UPDATE record SET img = 'C:\Users\Narukana\Documents\Github\Household-Account" +req.files[0].path+ "' ORDER BY time DESC LIMIT 1";
  
        connection.query(imgsql, (err, results, fields) => {
            if (err) {
                console.log(err);
                throw err;
            }
        //console.log(results);
        console.log("image path uploaded in db");
        });

        res.redirect('/');
    });
});

////////////////////////////////////////////////////////////////////////

///////////////////////text info upload/////////////////////////////////////////

app.post('/post-submit', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log("Stuff sent to server", req.body);
    res.send(["Saved:", req.body]);
    var sql = "INSERT INTO record VALUES (null, Now(), '" 
        +req.body.description+"', '"+req.body.expense+"', null)";
  
    connection.query(sql, (err, results, fields) => {
        if (err) {
            console.log(err);
            throw err;
        }
        // console.log(results);
    });
    
});
//////////////////////////////////////////////////////////////////////////////////


var port = 8001;
app.listen(port, () => {
    console.log("This app is listening on port " + port + "!");
});