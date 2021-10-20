const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOption = {
    from: "Sharan Kudtarkar <sharankudtarkar@adorians.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transporter.sendMail(mailOption);
};
module.exports = sendEmail;
