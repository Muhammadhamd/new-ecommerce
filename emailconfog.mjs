import { ObjectId } from "mongodb";
import {client} from "./db/mongodb.mjs"

const db = client.db("yacht"),
  userCol = db.collection("mailtosend")
import nodemailer from 'nodemailer';

const sendEmail = async (subject, text) => {
  try {

    const data = await userCol.find({}).toArray()
    console.log(data[0].email)
    const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'rachel.spencer50@ethereal.email',
            pass: '8kNebyYMJ38J2BJVtT'
        }
    });

    const mailOptions = {
      from: 'muhammadhamd.dev@gmail.com',
      to:data[0].email, // Use the 'to' parameter to dynamically set the recipient
      subjec:subject, // Use the 'subject' parameter to set the subject
      text:text // Use the 'text' parameter to set the email content
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail;
