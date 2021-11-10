const express = require("express");
const {
  sendData,
  seeData,
  updateData,
  deleteData,
  allVendor,
  vendorStatus,
  smartSearch,
  sendEmail,
} = require("../Controller/vendorController");
const { protect } = require("../Controller/SignInController");
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
vendor.route("/send_email/").post(sendEmail);
module.exports = vendor;
