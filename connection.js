const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/Bucket")
  .then(() => console.log("Database Successfully Connected!!"))
  .catch((err) => console.log("Database Connection Failed:", err));

module.exports = mongoose;