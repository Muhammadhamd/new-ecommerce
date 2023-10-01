import express from "express"
import path from "path"
import { ObjectId } from "mongodb"
import nodemailer from "nodemailer"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"
import { Console } from "console"

const db = client.db("yacht"),
      visiteReqCol = db.collection('tourreq');


   






  
       
    

router.post("/request-tour", async(req,res)=>{
  if (!req?.cookies?.Token) {
    return res.status(401).send("login as a user to use this feature")
  }
    const currentUser = req.decodedData


    // const userData =await userCol.findOne({email:currentUserEmail})
   const Data= req.body
   console.log(Data.data._id, currentUser._id) 
 
    
  
   const isRequested = await visiteReqCol.findOne({
    $and: [
      { 'Data.data._id': Data.data._id },
      { 'currentUser._id': currentUser._id },
      { status: 'pending' }
    ]
  });
   if(isRequested){

    console.log(isRequested)
    res.send('you are already requested for visite')
    return
   }
   await visiteReqCol.insertOne({
    Data,
    currentUser,
    status:'pending'
   })
  
   res.status(200).send("data uploaded")
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
      text:` A user has requested a tour </br> UserInformation:${'email:',currentUser.email ,'name:',currentUser.name}`,
    };
  
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:');
        res.status(500).send('An error occurred while sending the email notification.');
        return
      } else {
        console.log('Email sent:', info.response);
       
      }
    });
})
router.get("/tour-requests-currentuser", async(req,res ,next)=>{
  if (!req?.cookies?.Token) {
    return res.status(401).send("login as a user to use this feature")
  }
  const currentUser = req.decodedData
  const userid = currentUser._id
  const requests =await visiteReqCol.find({'currentUser._id' : userid}).toArray()
  if (requests.length > -1) {
    res.send(requests)
       return
     }
     res.send("no tour request")
      
   
   
   
})


export default router