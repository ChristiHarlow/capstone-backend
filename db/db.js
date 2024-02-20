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

// Function to connect and synchronize the database
async function connectToDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        // Uncomment the line below if you want to sync all models with the database
        // await sequelize.sync();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = sequelize;
