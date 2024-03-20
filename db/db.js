// db/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

console.log('Database URL:', databaseUrl); // Ensure this outputs the correct database URL
const sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: console.log // or false to disable logging
});

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
