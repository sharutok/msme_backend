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
    orgin: [
      process.env.NODE_ENV === "production"
        ? "http://27.107.7.11:3000"
        : "http://localhost:3000",
    ],
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
