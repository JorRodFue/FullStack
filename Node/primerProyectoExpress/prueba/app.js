var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var personasRouter = require('./routes/personas');
var escritoresRouter = require('./routes/escritores');




var app = express();

//MIDDLEWARE 1
app.use((req, res, next) => {
  console.log("pasa por el middleware 1");
  next()
})

//MIDDLEWARE 2
app.use((req, res, next) => {
  const fs = require("fs");
  console.log("Pasa por el Middleware 2")


  fs.appendFile("./log.txt", `Metodo : ${req.method} y URL : ${req.url}\n`, function () {

    next()

  })
    ;
});

// view engine setup DIRECTORIO DE RUTAS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/personas', personasRouter);
app.use('/escritores', escritoresRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
