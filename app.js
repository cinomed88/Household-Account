var fs = require('fs');
var express = require('express');
var app = express();


app.use('/css', express.static('static/css'));
app.use('/img', express.static('static/img'));
app.use('/js', express.static('static/js'));


app.get('/', (req, res) => {
    let indexPage = fs.readFileSync('./static/index.html', 'utf8');
    res.send(indexPage);
});


var port = 8000;
app.listen(port, () => {
    console.log("This app is listening on port " + port + "!");
});