const { DataTypes, Model } = require('sequelize');

class Post extends Model { }

const postInit = (seq) => {
    Post.init({
        author: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        sequelize: seq,
        modelName: 'Post'
    });
}
module.exports = { Post, postInit };



// Post.sync()
//     .then(() => {
//         console.log('Post table synced');
//         seq.close();
//     })