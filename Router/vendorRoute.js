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
  dataForToday,
  dataSetForGraph,
  showDataOfMSME
} = require("../Controller/vendorController");



const vendor = express.Router();


vendor.route("/vendor/:id").patch(updateData).delete(deleteData).post(sendData);
vendor.route("/vendor/detail/:id/:org").get(seeData)
vendor.route("/vendor/access/:plant").get(allVendor);//cookie get
vendor.route("/vendor/status/:status").get(vendorStatus);
vendor.route("/vendor/smartSearch/:searchVariable").get(smartSearch);
vendor.route("/send_email/").post(sendEmail);
vendor.route("/today_data").get(dataForToday)
vendor.route("/graph/data/count").get(dataSetForGraph)
vendor.route("/msms_vendor").get(showDataOfMSME)
module.exports = vendor;
