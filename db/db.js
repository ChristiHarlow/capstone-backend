const Sequelize = require("sequelize");

const db = new Sequelize("postgres://christiharlow@localhost:5432/favorites", {
    logging: false,
});
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
