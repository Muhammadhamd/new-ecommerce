import express from "express";
const router = express.Router();
import path, { join } from "path";
import mongoose from "mongoose"
import bcrypt from "bcrypt";

import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
import {client} from "../../db/mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("yacht");
const col = db.collection("users")



router.post("/api/v1/login", async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        res.send("plz fill all requests")
        return
    }
   
      

    try {
      const data = await col.findOne(
        { email: email  },
        "email password"
      );
  0
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
          name: data.name,
          phoneNumber: data.phoneNumber,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      }, SECRET);

      // res.send(token);

      res.cookie('Token', token, {
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
  });
  
  router.post("/api/v1/logout",(req, res) => {

    res.cookie('Token', '', {
         maxAge: 1,
         httpOnly: true
     });
 
     res.send("Logout successful" );
     console.log(req.cookies)
 })
  router.get("/usertoken",(req,res)=>{

  if(req?.cookies?.Token){
   
    res.send({Tokenis:true}) 
    return
  }
     res.send({Tokenis:false})
  })

  router.get("/login",(req,res)=>{
    if(req?.cookies?.Token){
   
      res.redirect("/api/v1/profile")
      return
    }
    res.sendFile(path.join(__dirname , "pages/login.html"))
  })


  router.post("/api/v1/register", async (req, res) => {
    const { name, phoneNumber, email, password } = req.body;
  
    if (!email || !password || !name || !phoneNumber) {
      res.status(400).send("Please fill in all required fields");
      return;
    }
  
    try {
      const data = await col.findOne({ email: email });
  
      if (data) {
        console.log("User already exists");
        return res.status(401).send(`User already exists with email: ${email}. Please register with another email.`);
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        console.log("Hashed Password:", hashedPassword);
  
        const insertResult = await col.insertOne({
          phoneNumber: phoneNumber,
          name: name,
          email: email,
          password: hashedPassword,
        });
  
        if (insertResult.insertedId) {
          // Generate a token and save it in a cookie upon successful registration
          const token = jwt.sign(
            {
              _id: insertResult.insertedId,
              email: email,
              name: name,
              phoneNumber: phoneNumber,
              iat: Math.floor(Date.now() / 1000) - 30,
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            },
            SECRET
          );
  
          res.cookie("Token", token, {
            maxAge: 86_400_000, // Cookie expires in 24 hours
            httpOnly: true,
          });
  
          res.status(201).send("User registered successfully.");
        } else {
          res.status(500).send("User registration failed.");
        }
      }
    } catch (err) {
      console.log("DB error:", err);
      res.status(500).send("User registration failed, please try again later.");
    }
  });

  router.get("/register",(req,res)=>{

    if(req?.cookies?.Token){
   
      res.redirect("/api/v1/profile")
      return
    }
    res.sendFile(path.join(__dirname ,"pages/register.html"))
  })
  export default router