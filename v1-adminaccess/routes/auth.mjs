import express from "express";
const router = express.Router();
import path, { join } from "path";
import bcrypt from "bcrypt";

const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
import {client} from "../../db/mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("yacht");
const col = db.collection("admins")


router.post("/add-admin", async (req, res) => {
    const { name, email, password } = req.body;
  console.log(req.body)
    if (!email || !password || !name) {
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
          name: name,
          email: email,
          password: hashedPassword,
        });
  
        
  
         
  
          res.status(201).send("User registered successfully.");
        }
      
    } catch (err) {
      console.log("DB error:", err);
      res.status(500).send("User registration failed, please try again later.");
    }
  });


  router.post("/admin-logout",(req,res)=>{

    
    res.cookie('AdminToken', '', {
        maxAge: 1,
        httpOnly: true
    });

    res.send("Logout successful" );
  })
  export default router