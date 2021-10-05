const express = require("express");
const {
  sendData,
  seeData,
  updateData,
  deleteData,
} = require("../Controller/vendorController");
const vendor = express.Router();
vendor
  .route("/vendor/:id")
  .get(seeData)
  .post(sendData)
  .patch(updateData)
  .delete(deleteData);
module.exports = vendor;
