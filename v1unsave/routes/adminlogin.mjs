import express from "express";
const router = express.Router();
import path from "path";
import mongoose from "mongoose"
import bcrypt from "bcrypt";
import nodemailer from "nodemailer"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
import {client} from "../../db/mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("yacht");
const col = db.collection("admins")



router.post("/api/v1/Admin-login", async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        res.status(400).send("plz fill all requests")
        return
    }
   
      

    try {
      const data = await col.findOne(
        { email: email  },
        "email password"
      );
  
      if (!data) {
        console.log("User not found");
        return res.status(401).send( "Incorrect email or password" );
      }

  
      const isMatch = await bcrypt.compare(password, data.password);
  
      if (isMatch) {
        console.log("Password matches");
  
        const token = jwt.sign({
          _id: data._id,
          email: data.email,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      }, SECRET);

      // res.send(token);

      res.cookie('AdminToken', token, {
          maxAge: 86_400_000,
          httpOnly: true,
          // sameSite: true,
          // secure: true
      });
      // Cookies.set("username", "john", { expires: 7, path: "/" });
        // console.log(req.cookies.Token)
        res.send("Login successful");
        return
      } else {
        console.log("Password did not match");
        return res.status(401).send("Incorrect password" );
      }
    } catch (err) {
      console.log("DB error:", err);
      res.status(500).send( "Login failed, please try later" );
    }

        const hashedPassword = await bcrypt.hash(password, 10)

    await col.insertOne({
        email:email,
        password:hashedPassword
    })
    res.send("login succesfully")
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
      text:`someone Just login as a Admin`,
    };
  
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('An error occurred while sending the email notification.');
        return
      } else {
        console.log('Email sent:', info.response);
       
      }
    });
  });
  

  router.get("/Admintoken",(req,res)=>{

  if(req?.cookies?.AdminToken){
   
    res.send({Tokenis:true}) 
    return
  }
     console.log(req?.cookies?.token)
     res.send({Tokenis:false})
  })

  router.get("/admin/login",(req,res)=>{

    if (req?.cookies?.AdminToken) {
      res.redirect("/admin")
      return
    }
    res.sendFile(path.join(__dirname , "pages/adminLogin.html"))
  })
  export default router