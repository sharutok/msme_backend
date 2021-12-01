const express = require("express");
const {
  CreateNewUser,
  loginIn,
  resetPasswordSendOtp,
  resetPassword,
  getUserByEmail,
  getAllUsers,
} = require("../Controller/SignInController");
const signIn = express.Router();
signIn.route("/").post(loginIn)
signIn.route("/email/:email").get(getUserByEmail)
signIn.route("/user/all").get(getAllUsers)
signIn.route("/password/otp").post(resetPasswordSendOtp);
signIn.route("/password/reset").patch(resetPassword);
signIn.route("/create/user").post(CreateNewUser);

module.exports = signIn;

// signIn.route("/:username").get(getUserByUsername)