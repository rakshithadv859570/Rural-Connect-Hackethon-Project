// utils/mailSender.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const mailSender = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 465, // SSL port
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_ID, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password or App Password
    },
    tls: {
      rejectUnauthorized: false, // Ignore self-signed certificate warnings
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // Throw the error to handle it where this function is called
  }
};

module.exports = mailSender;
