// Favorites.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Favorites = sequelize.define(
    "Favorites",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imageURL: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        links: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sort: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "favorites",
    }
);

module.exports = Favorites;
