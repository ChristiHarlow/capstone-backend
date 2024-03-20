// db/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

const sequelizeOptions = {
    dialect: "postgres",
    logging: false, // set to console.log to see SQL queries, or false to disable logging
    
};

console.log('Database URL:', databaseUrl);
const sequelize = new Sequelize(databaseUrl, sequelizeOptions);

// Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

testConnection();

module.exports = sequelize;
