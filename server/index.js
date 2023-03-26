const express = require("express");

const server = express();
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");

const personRouter = require("./routes/personRouter");

server.use(bodyParser.json());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

server.use("/person", personRouter);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected.");
    server.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
