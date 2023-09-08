const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        displayname: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Posts
}