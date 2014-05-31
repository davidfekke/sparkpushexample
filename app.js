
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var apns = require("apns"), options, connection, notification;

var deviceToken = "???????? ???????? ???????? ???????? ???????? ???????? ???????? ????????";

options = {
   keyFile : "key.pem",
   certFile : "cert.pem",
   gateway : "gateway.sandbox.push.apple.com",
   connectionTimeout : 10000,
   debug : true
};


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.post('/apns', function(req, res) {
	res.send("sending apns");
	connection = new apns.Connection(options);

	notification = new apns.Notification();
	notification.device = new apns.Device(deviceToken);
	notification.alert = "I just pushed my spark button!";
	notification.sound = "dong.aiff";

	connection.sendNotification(notification);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
