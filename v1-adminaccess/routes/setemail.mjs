
import express from "express"
import path from "path"
import { ObjectId } from "mongodb"
import nodemailer from "nodemailer"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"
import { Console } from "console"

const db = client.db("yacht"),
      col = db.collection("mailtosend")

      router.put("/setemail",async(req,res)=>{
          const {email}= req.body 

          const dataexist = await col.findOne({})
          dataexist ? await col.updateOne({}, { $set: { email } }) : await col.insertOne({email:email})

          res.send('data inserted')
    })
    router.get("/currentemail",async(req,res)=>{
        const data = await col.find({}).toArray()
        data ?  res.send(data) : res.send("no email set")
    })

      export default router