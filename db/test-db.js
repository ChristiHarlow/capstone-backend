require('dotenv').config();
const { Sequelize } = require('sequelize');

// Ensure the environment variable is being read correctly
const databaseUrl = 'postgres://christiharlow:Kiara219@localhost:5432/favorites';

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: console.log, // Enable logging for debugging purposes
});

// Function to test the database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();
