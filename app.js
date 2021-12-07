const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const vendor = require("../Backend/Router/vendorRoute");
const fileUploadRoute = require("./Router/fileUploadRoute");
const SignInRouter = require("./Router/SignInRouter");
const fileUpload = require("express-fileupload");
const cors = require("cors");

app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    res.set("Access-Control-Allow-Creadentials", "true")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser())
// app.get('/', function(req, res){
//    res.cookie('test', "username", {maxAge: 10800}).send('cookie set');
// });
app.use("/login", SignInRouter);
app.use("/", vendor);
app.use("/file-upload", fileUploadRoute);
module.exports = app;
