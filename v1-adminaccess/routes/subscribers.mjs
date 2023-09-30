
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


   



router.get("/countsubscribers", async(req,res ,next)=>{

    const subscribers = await subscribeCol.countDocuments()
    res.json({ count: subscribers });
     
})
router.delete('/subscriber/:id',async(req,res)=>{
  const subid = req.params.id

  const delte = await subscribeCol.findOneAndDelete({_id: new ObjectId(subid)})
  
  delte ?  res.send("subscriber is removed") : res.status(404).send("they maybe already removed or unsubscribed") 
})
   router.get("/subscribers",async(req,res)=>{

    const sub = await subscribeCol.find({}).toArray()
    res.send(sub) 
  })
  router.get("/admin/subscribers",(req,res) =>{

    res.sendFile(path.join(__dirname , "pages/subscribedb.html"))
  })
  export default router