var createError = require('http-errors');
var mongoose = require('mongoose');
var express = require('express');
var logger = require('morgan');

var mongoDB = 'mongodb://127.0.0.1/tpc6'; 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection; 
db.on('error',console.error.bind(console,'MongoDB connection error!'));
db.on('open', function() {
  console.log("Successfully connected to MongoDB!")
})

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({erro: err});
});

module.exports = app;
