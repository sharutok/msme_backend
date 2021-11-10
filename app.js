const express = require("express");
const app = express();
const vendor = require("../Backend/Router/vendorRoute");
const fileUploadRoute = require("./Router/fileUploadRoute");
const SignInRouter = require("./Router/SignInRouter");
const fileUpload = require("express-fileupload");

const cors = require("cors");

app.use(cors());
app.use(fileUpload());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });
app.use("/", vendor);
app.use("/file-upload", fileUploadRoute);
app.use("/login", SignInRouter);
module.exports = app;
