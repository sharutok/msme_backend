const express = require("express");
const app = express();
const vendor = require("../Backend/Router/vendorRoute");
const fileUpload = require("express-fileupload");
const { sequelize } = require("./models");
const cors = require("cors");
const fileUploadRoute = require("./Router/fileUploadRoute");
app.use(cors());
app.use(fileUpload());
app.use(express.json());

// const main = async () => {
//   await sequelize.sync({ force: true });
// };
// main();

app.use("/", vendor);
app.use("/file_upload", fileUploadRoute);
module.exports = app;
