require("dotenv").config();
const { Sequelize } = require("sequelize");

// Use Cloud SQL Proxy connection string format if running on GAE
const isAppEngine = process.env.INSTANCE_CONNECTION_NAME != null;
// const databaseUrl = isAppEngine 
//     ? `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}/${process.env.DB_NAME}`
//     : process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

const databaseUrl = "postgres://favorite-things-120671:us-east5:favorites-capstone" 

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: isAppEngine ? {
        socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    } : {}
});

// Function to test the database connection
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
