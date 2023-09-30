import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import nodemailer from 'nodemailer';
// import  transporter  from "./emailconfog.mjs"
import { ObjectId } from "mongodb"
import bodyParser from "body-parser"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"

const db = client.db("yacht"),
      subscribeCol = db.collection('subscribed');


   




      router.use(bodyParser.json());


  
       
    

router.post("/subscribe", async(req,res)=>{

    const email = req.body.email
    console.log(email)
    const isSubscribed =await subscribeCol.findOne({email:email})

    if(isSubscribed){
        res.send(`already subscribed with ${email} try another email` )
        return
    }

    await subscribeCol.insertOne({email:email})



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
        to: 'gumnamfacts65@gmail.com', // Replace with the admin's email address
        subject: 'New User Post',
        text: 'A user has posted something on the website.',
      };
    
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('An error occurred while sending the email notification.');
          return
        } else {
          console.log('Email sent:', info.response);
          res.status(200).send('subscrihbe successfully saved, and email notification sent to admin.');
        }
      });

})



export default router