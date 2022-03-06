const { DataTypes, Model } = require('sequelize');
const { User } = require('./User');

class Post extends Model {

}

// Post.associate = function () {
//     Post.belongsTo(User);
// }

const postInit = (seq) => {
  Post.init({
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,

    // },
    // username: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    sequelize: seq,
    modelName: 'Post',

  });
}

module.exports = { Post, postInit };