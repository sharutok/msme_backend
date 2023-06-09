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
    tls: {
      ciphers: "SSLv3",
    },
  });

  //TEST
  //PRODUCTION
  const mailOption = {
    from: "Finance Desk <financedesk@adorians.com>",
    to: option.email,
    bcc: "sharankudtarkar@adorians.com",
    subject: option.subject,
    text: option.text,
    html: option.html,
  };
  // console.log(mailOption);
  await transporter.sendMail(mailOption);
};
module.exports = sendEmail;
