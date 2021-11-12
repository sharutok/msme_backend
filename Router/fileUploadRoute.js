const express = require("express");
const {
  uploadFileImgGet,
  uploadFileImgPost,
  deleteImg
} = require("../Controller/FileUploadController");
const uploadFile = express.Router();

uploadFile.route("/img/:id").get(uploadFileImgGet).post(uploadFileImgPost).delete(deleteImg)
// uploadFile.route("/img/:id")
module.exports = uploadFile;
