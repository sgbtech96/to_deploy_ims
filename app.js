var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");



var indexRouter = require('./routes/index');
var submittedRouter = require('./routes/submitted');
var showtables=require('./tables');

var app = express();
delete require.cache[require.resolve('./tables.js').jsonTable];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/submitted/', submittedRouter);

app.use('/showtables/',showtables);

app.get('/tables',(req,res)=>{
	delete require.cache[require.resolve('./tables.js').jsonTable];
	//delete require.cache['./tables.js']; 
	console.log(require.cache[require.resolve('./tables.js').jsonTable]);
	var msg = require('./tables.js');
	res.send(msg.jsonTable);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
