const { Sequelize } = require("sequelize");

// Configure Sequelize to connect to the database using environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: console.log,
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
