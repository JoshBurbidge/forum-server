import Sequelize from 'sequelize';
import { Post, postInit } from '../model/Post.js';
import { User, userInit } from '../model/User.js';

const syncTables = async () => {
  await User.sync({ alter: true });
  console.log('User table synced');
  await Post.sync({ alter: true });
  console.log('Post table synced');
};

function sequelizeInit() {
  // initialize sequelize
  const seq = new Sequelize('forum2', process.env.mysql_user, process.env.mysql_pass, {
    host: 'localhost',
    dialect: 'mysql'
  });

  postInit(seq);
  userInit(seq);
  seq.models.User.hasMany(seq.models.Post);
  seq.models.Post.belongsTo(seq.models.User);
}

module.exports = { sequelizeInit, syncTables };
