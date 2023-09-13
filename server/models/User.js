const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        displayname: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Users.associate = (models) => {
        Users.hasMany(models.Post, {
            onDelete: "cascade",
        });
    }

    Users.associate = (models) => {
        Users.hasMany(models.Like, {
            onDelete: "cascade",
        });
    }

    return Users
}