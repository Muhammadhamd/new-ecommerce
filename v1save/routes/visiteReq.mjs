import express from "express"
import path from "path"
import nodemailer from "nodemailer"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"

const db = client.db("yacht"),
      visiteReqCol = db.collection('visitreq');


   






  
       
    

router.post("/request-visite", async(req,res)=>{
  if (!req?.cookies?.Token) {
    return res.status(401).send("login as a user to use this feature")
  }
    const currentUserEmail = req.decodedData


    // const userData =await userCol.findOne({email:currentUserEmail})
   const {time , date , message }= req.body

   console.log(req.body)

   if(!time || !date|| !message)
{
res.status(401).send("fill all requests")
}
   await visiteReqCol.insertOne({
    userAccoundId:currentUserEmail._id,
    email:currentUserEmail.email,
    phoneNumber:currentUserEmail.phoneNumber,
    name:currentUserEmail.name,
    message:message,
    dateToVisit:date,
    timeToVisit:time,
    timeStamp: new Date(),
    status:"pending"

   })
  

   res.status(200).send("your request is submited we will aprove it later")
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
      text:` A user has requested a visit </br> UserInformation:${'email:',currentUserEmail.email ,'name:',currentUserEmail.name}`,
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
})

router.get("/visit-requests-currentuser", async(req,res ,next)=>{
  if (!req?.cookies?.Token) {
    return res.status(401).send("login as a user to use this feature")
  }
  const currentUser = req.decodedData
  const userid = currentUser._id
  const requests =await visiteReqCol.find({userAccoundId : userid}).toArray()
  if (requests) {
    res.send(requests)
       return
     }
     re.send("no visit request")
   
})


export default router