require('dotenv').config();
const { Sequelize } = require('sequelize');

// Ensure the environment variable is being read correctly
const databaseUrl = process.env.LOCAL_DATABASE_URL;
console.log('Database URL:', databaseUrl);

// Initialize Sequelize with the connection string
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
