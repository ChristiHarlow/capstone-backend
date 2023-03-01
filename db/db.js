const Sequelize = require("sequelize");

//if we are running on elastic beanstalk use elastic beanstalk connection

let db;
if (process.env.RDS_HOSTNAME == "") {
    console.log("Connecting to RDS", process.env.RDS_HOSTNAME);
    db = new Sequelize(
        `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}:${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`,
        { logging: false }
    );
} else {
    console.log("Connecting to local database");
    db = new Sequelize("postgres://christiharlow@localhost:5432/favorites", {
        logging: false,
    });
}

//let options = {};
//let databaseURL = process.env.DATABASE_URL;
//if (!databaseURL) {
// this means we're on localhost!
//    (databaseURL = "postgres://christiharlow@localhost:5432/favorites"),
//        (options = {
//            logging: false,
//        });
//} else {
// we're not on localhost!
//    options = {
//       logging: false,
//        dialectOptions: {
//            ssl: {
//               require: true,
//                rejectUnauthorized: false,
//            },
//        },
//   };
//}

const db = new Sequelize(databaseURL, options);
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
