const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const projects = require("./projects/projectRoute");
const actions = require("./actions/actionRoutes");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/projects/", projects);
server.use("/api/actions/", actions);

module.exports = server;
