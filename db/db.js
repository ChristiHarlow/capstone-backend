require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

// Determine database connection details from environment variables
const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

// Initialize sequelize with appropriate options
let sequelizeOptions = {
  dialect: "postgres",
  logging: false, // Toggle logging if needed
};

if (process.env.DATABASE_URL) {
  console.log("Connecting to Fly.io database with SSL configuration");
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: process.env.NODE_ENV === "production",
      rejectUnauthorized: process.env.NODE_ENV === "production", // Ensure strict SSL validation in production
    },
  };
} else {
  console.log("Connecting to local database without SSL configuration");
}

const sequelize = new Sequelize(databaseUrl, sequelizeOptions);

// Define the Favorites model
const Favorites = sequelize.define(
  "Favorites",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Add other attributes here, ensuring they match your database schema
    // For example, category, summary, imageURL, price, links, etc.
  },
  {
    // Model options can be specified here
    tableName: "favorites", // Explicitly specify table name if it doesn't match the model name
  }
);

// Function to connect and synchronize the database
async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await sequelize.sync(); // Consider using { force: true } cautiously in development
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Export the sequelize instance, models, and connect function
module.exports = { sequelize, Favorites, connectToDB };
