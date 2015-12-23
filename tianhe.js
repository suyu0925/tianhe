var os = require('os');
var webServer = require('./webserver');

// web port
var webPort = 3000;
if (os.type() == 'Darwin') {
    webPort = 3000;
}

webServer.listen(webPort, function () {
    console.log('web server started on port ' + webPort);
});

