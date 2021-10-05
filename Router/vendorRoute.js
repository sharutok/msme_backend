const express = require("express");
const {
  sendData,
  seeData,
  updateData,
  deleteData,
} = require("../Controller/vendorController");
const vendor = express.Router();
vendor.route("/vendor/:id").get(seeData).patch(updateData).delete(deleteData);
vendor.route("/vendor").post(sendData);
module.exports = vendor;
