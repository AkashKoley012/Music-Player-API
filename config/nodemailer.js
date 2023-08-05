const nodemailer = require("nodemailer");

//! Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    port: process.env.PORT,
    secure: process.env.SECURE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

//! Helper function to send an email
const sendEmail = (email, subject, text) => {
    const mailOptions = {
        from: process.env.USER,
        to: email,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error("Error sending email:", error);
        }
    });
};

module.exports = { sendEmail };
