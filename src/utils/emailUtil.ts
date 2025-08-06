import nodemailer from 'nodemailer';
import config from 'dotenv';
import { Activity } from '../entities/activity';
import { Location } from '../entities/location';

// get data from .env file
config.config();
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT || '587';

interface EmailData {
    endpoint: string;
    activity: Activity;
    location: Location;
}

export const sendEmail = async (data: EmailData) => {

    const transporter = nodemailer.createTransport({
        host: host,
        port: parseInt(port),
        secure: false,
        auth: {
            user: user,
            pass: pass
        }
    });

    const mailOptions = {
        from: user,
        to: 'zott_oliver@web.de',
        subject: 'Velosaurus Backend - API request',
        text: `Message from: ${data.endpoint}\n\n${data.activity}\n${data.location}\n`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }

};
