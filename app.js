const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const vendor = require("../Backend/Router/vendorRoute");
const fileUploadRoute = require("./Router/fileUploadRoute");
const SignInRouter = require("./Router/SignInRouter");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require('morgan')
require('dotenv').config({
    path: './.env'
})

// console.log(process.env.HOSTNAME);

app.use(morgan('tiny'))
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser())
app.use("/login", SignInRouter);
app.use("/", vendor);
app.use("/file-upload", fileUploadRoute);
module.exports = app;
