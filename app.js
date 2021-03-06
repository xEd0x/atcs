var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var visitatoreRouter = require('./routes/visitatore');
var statisticsRouter = require('./routes/statistiche');
var areaRouter = require('./routes/area_museo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/javascripts', express.static(__dirname + '/javascripts'));
app.use('/images', express.static(__dirname + '/images'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/visitatore', visitatoreRouter);
app.use('/statistiche', statisticsRouter);
app.use('/area', areaRouter);


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

var server = app.listen(8080, function () {
  console.log('Server up');
});

module.exports = app;
