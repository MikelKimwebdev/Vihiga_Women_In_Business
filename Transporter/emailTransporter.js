const nodemailer = require("nodemailer");

const createEmailTransport = () => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'michaelkimanzi@outlook.com',
            pass: process.env.EMAIL_PASS,
        }
    });
    return transporter;
}

module.exports = { createEmailTransport };
