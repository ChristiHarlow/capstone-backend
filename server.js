const express = require("express");
const server = express();
const cors = require("cors");
server.use(
    cors({
        credentials: true,
        origin: [
            "http://localhost:3000",
            "https://christiharlo-capstone-frontend.herokuapp.com",
        ],
    })
);

const { db, Favorites } = require("./db/db.js");

server.get("/", (req, res) => {
    res.send({ hello: "world" });
});

server.get("/favorites", async (req, res) => {
    res.send({ favorites: await Favorites.findAll() });
});

// if heroku, process.env.PORT will be provided
let port = process.env.PORT;
if (!port) {
    // otherwise, fallback to localhost 3001
    port = 3001;
}

server.listen(port, () => {
    console.log("server running");
});
