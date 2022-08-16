const { DataTypes } = require("sequelize");

const Favorites = (db) => {
    return db.define("favorites", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        summary: DataTypes.STRING,
        imageURL: DataTypes.STRING,
        price: DataTypes.TEXT,
        links: DataTypes.TEXT,
    });
};

module.exports = Favorites;
