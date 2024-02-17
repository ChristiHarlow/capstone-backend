const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path as per your project structure

const ModelName = sequelize.define(
    "ModelName",
    {
        // example attribute
        attributeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Define other attributes here
    },
    {
        // Model options (if any)
    }
);

module.exports = ModelName;
