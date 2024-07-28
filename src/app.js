import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import indexRouter from './routes/index';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';
import { sequelizeInit } from './helpers/sequelize';
import config from 'config';

export async function initialize() {
  const app = express();

  if (config.get('env') === "localhost") {
    app.use(logger('dev'));
  } else {
    app.use(logger('common'));
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
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

  app.use('/api', indexRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/users', usersRouter);


  await sequelizeInit();


  // this will receive the request if it gets past the routers defined above
  app.use(function (req, res) {
    res.status(404);
    res.send(createError(404, 'invalid url'));
  });

  // error handler because it has 4 args
  // eslint-disable-next-line no-unused-vars
  app.use(function (err, req, res, next) {
    console.error(err);

    res.status(500);
    res.send(createError(500));
  });

  return app;
}
