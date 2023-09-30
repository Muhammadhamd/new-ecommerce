

import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()
import nodemailer from "nodemailer"
import {client} from "../../db/mongodb.mjs"
import { Timestamp } from 'mongodb'
import emailsend from "../../emailconfog.mjs"
const db = client.db("yacht"),
    //   userCol = db.collection("users"),
      contactReqCol = db.collection('contactRequestes')

router.post("/api/v1/contactReq",async(req,res)=>{
    const {email , phoneNumber ,message , subject ,name} =req.body
    console.log(email , phoneNumber ,message , subject ,name)

    if (!email , !phoneNumber ,!message , !subject ,!name) {
      res.status(401).send('fill all form fields please')
    }
 try {
    await contactReqCol.insertOne({
        email:email,
        phoneNumber:phoneNumber,
        subject:subject,
        message:message,
        name:name, 
        status:"pending"
    })

  const title = "someone request you to contanct"
  const text = "someone request you to contanct fag aeg aegae g"
  
    emailsend(title ,text)
      

    res.send(`Thankyou ${name} for contact your request is sucessfully registerd we will response you later`)
 } catch (error) {
    // res.status(403).send(error)
    console.log(error)
 }

})
router.get("/contact-requests",async(req,res)=>{

   const contactRequestsData =  await contactReqCol.find({}).toArray()
   res.send(contactRequestsData)
})
router.get('/contact', (req,res)=>{

    res.sendFile(path.join(__dirname , 'pages/contact.html'))
})
export default router