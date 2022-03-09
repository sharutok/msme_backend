const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const vendor = require("../Backend/Router/vendorRoute");
const fileUploadRoute = require("./Router/fileUploadRoute");
const SignInRouter = require("./Router/SignInRouter");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
var json2xls = require("json2xls");
require("dotenv").config({
  path: "./.env",
});

app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "http://14.143.203.75:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(json2xls.middleware);

app.use("/login", SignInRouter);
app.use("/", vendor);
app.use("/file-upload", fileUploadRoute);
module.exports = app;
