// const { Sequelize } = require('sequelize');
import Sequelize from 'sequelize'
const { Post, postInit } = require('../model/Post.js');
const { User, userInit } = require('../model/User.js');

const synctable = async () => {
  await Post.sync({ alter: true })
  console.log('Post table synced');
  await User.sync({ alter: true })
  console.log('User table synced');
};

function sequelizeInit() {
  // initialize sequelize
  const seq = new Sequelize('forum', process.env.mysql_user, process.env.mysql_pass, {
    host: 'localhost',
    dialect: 'mysql'
  });

  postInit(seq);
  userInit(seq);
  seq.models.User.hasMany(seq.models.Post);
  seq.models.Post.belongsTo(seq.models.User);

  // synctable();
}

module.exports = {sequelizeInit, synctable}