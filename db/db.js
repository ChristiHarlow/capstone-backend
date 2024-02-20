// db/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

const sequelizeOptions = {
    dialect: "postgres",
    logging: false, // Adjust logging as needed
};

if (process.env.DATABASE_URL) {
    console.log("Connecting to Fly.io database with SSL configuration");
    sequelizeOptions.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: true,
        },
    };
} else {
    console.log("Connecting to local database without SSL configuration");
}

const sequelize = new Sequelize(databaseUrl, sequelizeOptions);

module.exports = sequelize;
