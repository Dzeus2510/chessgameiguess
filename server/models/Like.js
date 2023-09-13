module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Like");

    return Likes;
};