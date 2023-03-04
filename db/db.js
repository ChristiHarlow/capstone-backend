const Sequelize = require("sequelize");
// Setup DB models

let db;
if (process.env.RDS_HOSTNAME) {
    console.log("Connecting to RDS", process.env.RDS_HOSTNAME);
    //if we are running on elastic beanstalk use elastic beanstalk connection
    db = new Sequelize(
        `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`,
        { logging: false }
    );
} else {
    console.log("Connecting to local database");
    // If we're running locally, use the local host connection
    db = new Sequelize("postgres://christiharlow@localhost:5432/favorites", {
        logging: false,
    });
}

// const db = new Sequelize(databaseURL, options);
const Favorites = require("./Favorites")(db);
// Connect and sync to DB
const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log("Connected");
        await db.sync(); //Sync by creating the tables based off our models if they don't already exist
    } catch (error) {
        console.error(error);
        console.error("Panic!");
    }
};

connectToDB();

module.exports = { db, Favorites };
// Export out the DB and Model so we can use it elsewhere in our code
