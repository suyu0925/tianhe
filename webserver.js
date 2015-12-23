var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var os = require('os');

var app = module.exports = express();

// web port
var webPort = 3000;
if (os.type() == 'Darwin') {
    webPort = 3000;
}

app.set('port', process.env.PORT || webPort);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middleware
app.use(compression()); //use compression
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// routers
app.use('/app', require('./routers/app'));

// Static middleware
app.use(express.static(__dirname + '/public'));

/* istanbul ignore next */
if (!module.parent) {
    app.listen(app.get('port'));
    console.log('Express started on port ' + app.get('port'));
}

module.exports = app;