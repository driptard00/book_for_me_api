// import important modules
const http = require("http");
const express = require("express");

// create instance of modules
const app = express();
const server = http.createServer(app);

// export modules
module.exports = { app, server, express };

