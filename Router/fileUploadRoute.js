const express = require("express");
const {} = require("../Controller/FileUploadController");
const uploadFile = express.Router();

uploadFile.route("/imgUpload/:id").post();
module.exports = uploadFile;
