const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());

const { db, Favorites } = require("./db/db.js");

server.get("/", (req, res) => {
    res.send({ hello: "world" });
});

server.get("/favorites", async (req, res) => {
    res.send({ favorites: await Favorites.findAll() });
});

server.listen(3001, () => {
    console.log("server running");
});
