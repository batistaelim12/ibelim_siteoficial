var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var routes = require('./routes/index');
var connection  = require('express-myconnection');
var mysql = require('mysql');
var Mailgun = require('mailgun-js');
var moment = require('moment');
var fs = require('fs');

// view engine setup
var engine  = require( 'ejs-locals' );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine( 'ejs', engine );

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', 4305);
app.set('serverip', process.env.NODE_IP || '127.0.0.1');


var mysqlUser = 'root';
var mysqlPass = '1234';

var mysqlHost = 'localhost';
var mysqlPort = 3306;

app.use(
    connection(mysql,{
        host: mysqlHost,
        user: mysqlUser,
        password : mysqlPass,
        port : mysqlPort, //port mysql
        database:'mkt'
    },'request')
);

app.get('/', function(req, res, next) {
  var apiAddress = "http://adm.batistaelim.com.br/api";
  //if (app.get('env') === 'development') {
    apiAddress = "http://localhost:4300/api"
  //}
  res.render('index',{apiUrl: apiAddress});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;

http.createServer(app).listen(app.get('port'), app.get('serverip'), function(){
    console.log( "Listening on " + app.get('serverip') + ", server_port " + app.get('port') )
  });
