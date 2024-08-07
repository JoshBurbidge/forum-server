import config from 'config';
import Sequelize from 'sequelize';
import { Post, postInit } from '../model/Post.js';
// import { User, userInit } from '../model/User.js';
import { getSecretObject } from '../utils/secrets.js';

export const syncTables = async () => {
  // await User.sync({ alter: true });
  // console.log('User table synced');
  await Post.sync({ alter: true });
  console.log('Post table synced');
};

export async function sequelizeInit() {
  const { username, password } = await getSecretObject('databaseCredentials');

  const seq = new Sequelize('forum', username, password, {
    host: config.get('databaseHost'),
    dialect: 'mysql'
  });

  postInit(seq);
  // userInit(seq);
}
