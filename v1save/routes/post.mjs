import express from "express";
import path from "path";
import { Storage } from "@google-cloud/storage";
import admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import multer from "multer"
const __dirname = path.resolve();
import sendEmail from "../../emailconfog.mjs"
const router = express.Router();
import { client } from "../../db/mongodb.mjs";

const db = client.db("yacht"),
  userCol = db.collection("users"),
  postsCol = db.collection("getAvalution"),
  productsCol = db.collection("product");



  const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
    },
  });

router.post("/getAValution", upload.single('filename'),  async (req, res) => {
  if (!req?.cookies?.Token) {
    return res.status(401).send("login as a user to use this feature")
  }
  

  const currentUser = req.decodedData;
  if (!currentUser) {
   return res.status(401).send("login please we are having trouble to get your account data")
  }
  console.log(req.file)
  // console.log(req.body.lastName)
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const bucket = admin.storage().bucket();
  const file = req.file;
  const originalname = `${Date.now()}-${file.originalname}`;
  const fileBuffer = file.buffer;
  
  // Define the path where you want to store the file in Firebase Storage.
  const filePath = `images/valutons/${originalname}`;

  // Upload the file to Firebase Storage.
  const fileUpload = bucket.file(filePath);

  await fileUpload.save(fileBuffer, {
      metadata: {
          contentType: file.mimetype,
      },
  });

  // Get the public URL of the uploaded file
      // Get the download URL
      const [publicUrl] = await fileUpload.getSignedUrl({
          action: 'read',
          expires: '01-01-3000', // Adjust the expiration date as needed
      });
  const {
    firstName,
    LastName,
    engine,
    hours,
    boatName,
    generator,
    boatcondition,
    location,
    owneroutright,
    amountOfOwner,
    route,
    attatchment, // Note: Change this to "attachments"
    addNote,
    address,
    make,
    model,
    email,
    phoneNumber,
  } = req.body;

   console.log("data updateda",publicUrl)
  

 
  
 
        postsCol.insertOne({
          userAccoundId: currentUser._id,
          useremail: currentUser.email,
          userphoneNumber: currentUser.phoneNumber,
          username: currentUser.name,
          timestamp: new Date(),
          status: "pending",
          firstName,
          LastName,
          engine,
          hours,
          boatName,
          generator,
          boatcondition,
          location,
          owneroutright,
          amountOfOwner,
          route,
          attachments:publicUrl , // Use the URLs of uploaded attachments
          addNote,
          address,
          make,
          model,
          email,
          phoneNumber
        });

        // Send response after saving the post

//         const subject = "valuation request"
//         const paragraph_emai = "someone requested you for valution on his boat check it out"
// sendEmail(subject , paragraph_emai)
        res.send("Post is created and saved in the database");


      

});

router.get("/productsCurrentUser", async (req, res) => {
  if (!req?.cookies?.Token) {
    return res.status(401).send("login as a user to use this feature")
  }
 

  const currentUser = req.decodedData;

  const data = await postsCol.findMany({ userAccoundId: currentUser._id}).toArray(); 
  res.send(data);
});

export default router;
