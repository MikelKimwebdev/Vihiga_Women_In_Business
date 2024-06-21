const { createEmailTransport } = require("./emailTransporter");

const sendVerificationEmail = (admin) => {
    const transporter = createEmailTransport();

    const mailOptions = {
        from: '"Vihiga Women in Business" <michaelkimanzi@outlook.com>',
        to: admin.email,
        subject: "Verify your email",
        html: `
            <p>Hello ${admin.userName}, verify your email by clicking the link below...</p>
            <a href='${process.env.CLIENT_URL}/verify_email?emailToken=${admin.emailToken}'>Verify your email</a>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
};

module.exports = { sendVerificationEmail };
