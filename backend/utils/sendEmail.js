const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        console.log('SMTP Service:', process.env.SMTP_SERVICE);
        console.log('SMTP Mail:', process.env.SMTP_MAIL);

        const transporter = nodemailer.createTransport({
            host: "smpt.gmail.com",
            port: 587,
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        }); 

        console.log('Transporter created with configuration:', transporter.options);

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        console.log('Mail options:', mailOptions);

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};

module.exports = sendEmail;
