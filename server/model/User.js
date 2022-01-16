const { DataTypes, Model } = require('sequelize');

// change models to sequelize.define() syntax to use assocations

class User extends Model {
    // associate = (models) => {
    //     User.hasMany(models.Post, { foreignKey: 'userId' });
    // }
}

// User.associate = function () {
//     User.hasMany(Post, { foreignKey: 'userId' });
// }

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
}
module.exports = { User, userInit };
