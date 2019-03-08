const express = require("express");

const rootRouter = require("../routes/rootRouter.js");
const gamesRouter = require("../routes/gamesRouter.js");
const errorRouter = require("../routes/errorRouter.js");

const server = express();

server.use(express.json());

server.use("/", rootRouter);
server.use("/games", gamesRouter);
server.use(errorRouter);

module.exports = server;
