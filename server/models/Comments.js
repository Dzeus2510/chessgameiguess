const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comment", {
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Comments
}