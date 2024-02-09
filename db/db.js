const Sequelize = require("sequelize");

let sequelize;

// Environment-based database connection
if (process.env.DATABASE_URL) {
    console.log("Connecting to Fly.io database");
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres", // Assuming PostgreSQL. Adjust accordingly.
        protocol: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Note: Only use this for trusted servers.
            },
        },
        logging: false,
    });
} else {
    console.log("Connecting to local database");
    sequelize = new Sequelize(
        "postgres://christiharlow@localhost:5432/favorites",
        {
            dialect: "postgres",
            logging: false,
        }
    );
}

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

// Execute the connect function
connectToDB();

// Export the sequelize instance and models
module.exports = { sequelize, Favorites };
