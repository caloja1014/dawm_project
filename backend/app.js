var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var clientRouter = require('./routes/client.routes');
var usersRouter = require('./routes/users');
var noticiasRouter= require("./routes/noticias.routes");
var diasRouter=require("./routes/dias.routes");
var direccionRouter = require('./routes/direccion.routes');

const cors = require("cors");
var app = express();
var corsOptions = {origin: "http://localhost:4200"};

const nodb= require("./collections");

app.use(cors(corsOptions)); 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use('/', clientRouter);
app.use('/users', usersRouter);
app.use("/noticias",noticiasRouter);
app.use("/compra",diasRouter);
app.use("/address",direccionRouter);



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
