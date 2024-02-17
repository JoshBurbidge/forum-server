const { DataTypes, Model } = require('sequelize');

class User extends Model {
}

const userInit = (seq) => {
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize: seq,
    modelName: 'User'
  });
};
module.exports = { User, userInit };
