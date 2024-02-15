require("dotenv").config();
const { Sequelize } = require("sequelize");

let sequelize;

// Determine database connection details from environment variables
const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

// Improved SSL configuration for production
let sequelizeOptions = {
  dialect: "postgres",
  logging: false,
};

if (process.env.DATABASE_URL) {
  console.log("Connecting to Fly.io database");
  sequelizeOptions = {
    ...sequelizeOptions,
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized:
          process.env.NODE_ENV === "production" ? true : false, // Adjust based on environment
      },
    },
  };
} else {
  console.log("Connecting to local database");
}

sequelize = new Sequelize(databaseUrl, sequelizeOptions);

// Define the Favorites model
const Favorites = sequelize.define(
  "Favorites",
  {
    // Example attributes. Adjust according to your schema.
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sort: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // Add other attributes here
  },
  {
    // Model options
  }
);

// Function to connect and synchronize the database
const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await sequelize.sync(); // Consider using sequelize.sync({ force: true }) for development only.
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Export the sequelize instance, models, and connect function
module.exports = { sequelize, Favorites, connectToDB };
