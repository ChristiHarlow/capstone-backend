require("dotenv").config();  // Ensures that environment variables from the .env file are loaded
const { Sequelize } = require("sequelize");

// Fetches the database URL from the environment variables
const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

// Initialize Sequelize with the database URL and configuration
const sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",  // Specifies that you are using PostgreSQL
    logging: console.log  // Enables logging of SQL queries (set to `false` to disable logging)
});

// Function to test the database connection
async function testConnection() {
    try {
        await sequelize.authenticate();  // Tries to authenticate with the database
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);  // Logs an error if the connection fails
    }
}

testConnection();  // Calls the function to test the connection

module.exports = sequelize;  // Exports the sequelize instance for use in other parts of the application

