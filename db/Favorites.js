const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Adjust the path according to your project structure

const Favorites = sequelize.define(
    "Favorites",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255), // Example max length
            allowNull: false, // Assuming name is required
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: true, // Assuming category can be optional
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
            type: DataTypes.DECIMAL(10, 2), // Assuming price is a decimal value
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
        tableName: "favorites", // Explicitly specify table name
    }
);

module.exports = Favorites;
