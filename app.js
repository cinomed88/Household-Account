var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var multer = require('multer');
const url = require('url');
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

// app.get('/MonthSum.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'html', 'MonthSum.html'));
// });
app.get('/MonthSum.html', (req, res) => {
    let SumPage = fs.readFileSync('./static/html/MonthSum.html', 'utf8');
    res.send(SumPage);
});


/////////////////////// transaction record load /////////////////////////////////////////
app.get('/ajax-GET-record', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let q = url.parse(req.url, true);
    console.log("displayed date: ", q.query['Date']);
    let dispDate = q.query['Date'];

    let qs = "SELECT time, description, expense, img FROM record WHERE DATE(time) = '"+dispDate+"'";
    let qsQuery = mysql.format(qs, ["time", "description", "expense", "img"]);
    connection.query(qsQuery, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    })

});
///////////////////////// Monthly transaction record load ///////////////////////////////////////////////
app.get('/ajax-GET-monthly-record', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let q = url.parse(req.url, true);
    console.log("displayed Month: ", q.query['Month'], q.query['Year']);
    let dispMonth = q.query['Month'];
    let dispYear = q.query['Year'];

    let qs = "SELECT time, description, expense, img FROM record WHERE MONTH(time) = '"+dispMonth+"' AND YEAR(time) = '"+dispYear+"'";
    let qsQuery = mysql.format(qs, ["time", "description", "expense", "img"]);
    connection.query(qsQuery, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    })

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////


// app.get('/plus-date', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     let q = url.parse(req.url, true);
//     console.log("date+1", q.query['Date']);
//     cDate = q.query['Date'];
//     var showDate = {Date : cDate};
//     res.send(showDate);

//     // res.redirect('/ajax-GET-record/?Date='+cDate);
//     // res.redirect('/');

// })

// app.get('/minus-date', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     let q = url.parse(req.url, true);
//     console.log(q.query['Date']);
//     cDate = q.query['Date'];
//     var showDate = {Date : cDate};
//     res.send(showDate);
//     //var showDate = {Date : cDate};

//     // res.redirect('/');

// })
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
        // var imgsql = "UPDATE record SET img = 'C:\\\\Users\\\\Narukana\\\\Documents\\\\Github\\\\Household-Account\\\\tempImages\\\\" +req.files[0].filename+ "' ORDER BY time DESC LIMIT 1";
        // To save URLs for web server: http://127.0.0.1:8887/ ...
        var imgsql = "UPDATE record SET img = 'http://127.0.0.1:8887/" +req.files[0].filename+ "' ORDER BY time DESC LIMIT 1";
        
        console.log(imgsql);
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
app.listen(process.env.PORT || port, () => {
    console.log("This app is running!");
});