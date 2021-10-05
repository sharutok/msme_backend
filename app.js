const express = require("express");
const vendor = require("../Backend/Router/vendorRoute");
const app = express();
app.use(express.json());
app.use("/", vendor);
module.exports = app;
