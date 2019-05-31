const express = require("express");
const server = express();
const projectRouter = require("./projectRouter");
const actionRouter = require("./actionRouter");


server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h3> hi there</h3>`);
});

module.exports = server;
