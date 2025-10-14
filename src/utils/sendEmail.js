import nodemailer from 'nodemailer';
SMTP.SMTP_PASSWORD;
import { SMTP } from '../constants.js';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: SMTP.SMTP_HOST,
  port: SMTP.SMTP_PORT,
  auth: {
    user: SMTP.SMTP_USER,
    pass: SMTP.SMTP_PASSWORD,
  },
});

export default async function sendEmail(options) {
  try {
    return await transporter.sendMail(options);
  } catch {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
}
