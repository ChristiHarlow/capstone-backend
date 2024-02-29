// db/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

const sequelizeOptions = {
    dialect: "postgres",
    logging: false, // Adjust logging as needed
};

if (process.env.DATABASE_URL) {
    sequelizeOptions.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: true,
        },
    };
}

const sequelize = new Sequelize(databaseUrl, sequelizeOptions);

module.exports = sequelize;
