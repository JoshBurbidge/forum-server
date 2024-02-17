var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.cookiesecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  // res.header('Access-Control-Allow-Headers', 'content-type, origin, x-requested-with, accept, x-pingother, *');
  // res.header('Access-Control-Allow-Credentials', true); // cookie doesn't work without this
  // if (req.cookies) console.log('cookies: ', req.cookies);
  if (req.signedCookies) console.log('signedCookies: ', req.signedCookies);
  // console.log(req);
  next();
});

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

const { sequelizeInit } = require('./helpers/sequelize');

sequelizeInit();


const { Error } = require('./model/errors/Error');
// this happens if the request gets past the routers defined above
// meaning the url is invalid (404)

// determine type of error and then forward (move to error router file)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new Error('invalid url'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  res.status(404);
  res.send(createError(404));
});

module.exports = app;
