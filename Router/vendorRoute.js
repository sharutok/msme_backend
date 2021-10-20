const express = require("express");
const {
  sendData,
  seeData,
  updateData,
  deleteData,
  uploadImgfile,
  allVendor,
  vendorStatus,
  smartSearch,
} = require("../Controller/vendorController");
const vendor = express.Router();
vendor
  .route("/vendor/:id")
  .get(seeData)
  .patch(updateData)
  .delete(deleteData)
  .post(sendData);
vendor.route("/vendor").get(allVendor);
vendor.route("/vendor/status/:status").get(vendorStatus);
vendor.route("/vendor/smartSearch/:searchVariable").get(smartSearch);
// vendor.route("/imgUpload/:id").post(uploadImgfile);
module.exports = vendor;
