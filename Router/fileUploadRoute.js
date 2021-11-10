const express = require("express");
const {
  uploadFileImgGet,
  uploadFileImgPost,
} = require("../Controller/FileUploadController");
const uploadFile = express.Router();

uploadFile.route("/img/:id").get(uploadFileImgGet);
uploadFile.route("/img/:id").post(uploadFileImgPost);
module.exports = uploadFile;
