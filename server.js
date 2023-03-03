const express = require("express");
const server = express();
const cors = require("cors");
server.use(
    cors({
        credentials: true,
        origin: [
            "http://christisfavoritethings.com",
            "http://www.christisfavoritethings.com",
            "http://localhost:3000",
        ],
    })
);

const { db, Favorites } = require("./db/db.js");

server.get("/", (req, res) => {
    res.send({ hello: "world!" });
});

server.get("/favorites", async (req, res) => {
    res.send({
        favorites: await Favorites.findAll({
            order: ["sort"],
        }),
    });
});

let port = 3001;
if (process.env.PORT) {
    port = process.env.PORT;
}

server.listen(port, () => {
    console.log("server running");
});
