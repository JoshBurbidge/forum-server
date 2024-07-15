import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { getSecretString } from './utils/secrets';
import indexRouter from './routes/index';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';
import { sequelizeInit } from './helpers/sequelize';

export async function initialize() {
  const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(await getSecretString('cookieSecret')));
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
    next();
  });

  app.use('/', indexRouter);
  app.use('/posts', postsRouter);
  app.use('/users', usersRouter);


  await sequelizeInit();


  const { Error } = require('./model/errors/Error');
  // this happens if the request gets past the routers defined above
  // meaning the url is invalid (404)

  // determine type of error and then forward (move to error router file)
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(new Error('invalid url'));
  });

  // error handler
  app.use(function (err, req, res) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    res.status(404);
    res.send(createError(404));
  });

  return app;
}
