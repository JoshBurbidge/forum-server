import { DataTypes, Model }  from 'sequelize';

class Post extends Model {

}

const postInit = (seq) => {
  Post.init({
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
};

module.exports = { Post, postInit };
