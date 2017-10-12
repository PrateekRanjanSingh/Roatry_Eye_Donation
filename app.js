var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var admin = require('./controllers/admin.js');
var donor = require('./controllers/donor.js');
var president = require('./controllers/president.js');

var app = express();
var session = require('express-session');

var db = require('./db');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({secret:'deathadder',saveUninitialized:true,resave:true}));
app.use(logger('dev'));
app.use(multipart());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/admin',admin);
app.use('/donor',donor);
app.use('/pres',president);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.connect('mongodb://localhost:27017/first_app',function(err){
	if(err){
		console.log("Couldn't Connect To Mongo.");
		process.exit(1);
	}
});


module.exports = app;
