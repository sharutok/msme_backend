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

  const mailOption = {
    from: "Ador Welding LTD <itpune@adorians.com>",
    to: option.email,
    subject: option.subject,
    text: option.text,
    html: option.html,
    // text: 'For clients with plaintext support only',
    // html: option.html,
  };
  // console.log(mailOption);
  await transporter.sendMail(mailOption);
};
module.exports = sendEmail;
