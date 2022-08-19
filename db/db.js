const Sequelize = require("sequelize");
//comment
let options = {};
let databaseURL = process.env.DATABASE_URL;
if (!databaseURL) {
    // this means we're on localhost!
    (databaseURL = "postgres://christiharlow@localhost:5432/favorites"),
        (options = {
            logging: false,
        });
} else {
    // we're not on localhost!
    options = {
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    };
}

const Favorites = require("./Favorites")(db);

const connectToDB = async () => {
    try {
        await db.authenticate();
        console.log("Connected");
        db.sync();
    } catch (error) {
        console.error(error);
        console.error("Panic!");
    }
};

connectToDB();

module.exports = { db, Favorites };
