const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env._HOST,
    port: process.env._PORT,
    secure: false,
    auth: {
      user: process.env._USERNAME,
      pass: process.env._PASSWORD,
    },
  });
  // console.log(process.env);
  const mailOption = {
    from: "Sharan Kudtarkar <itpune@adorians.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  // console.log(mailOption);
  await transporter.sendMail(mailOption);
};
module.exports = sendEmail;
