import admin from "firebase-admin"
import dotenv from 'dotenv';
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
// import deleteImageFromStorage from "./deleteImageFunction.mjs";
import express from 'express';
import { client } from '../../db/mongodb.mjs'
import { ObjectId } from 'mongodb'
import multer from 'multer'
const db = client.db("yacht");
const col = db.collection("employe");
import path from "path"
const __dirname = path.resolve()
let router = express.Router()
import fs from "fs"


  const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
    },
  });
  
// POST    /api/v1/post
router.post('/add-employ', upload.single('head-image'), async (req, res, next) => {
    console.log(req.body);
  const bucket = admin.storage().bucket();

    const { name, email, phonenumber } = req.body;
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const file = req.file;
        const originalname = `${Date.now()}-${file.originalname}`;
        const fileBuffer = file.buffer;
        
        // Define the path where you want to store the file in Firebase Storage.
        const filePath = `images/employees/${originalname}`;

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
    

        // Save the public URL in MongoDB
        const insertResponse = await col.insertOne({
            Name: name,
            phonenumber: phonenumber,
            email: email,
            image: publicUrl, // Save the public URL in MongoDB
        });

        res.send('employee created');
    } catch (e) {
        console.log("error inserting into MongoDB: ", e);
        res.status(500).send('server error, please try later');
    }
});





// [92133,92254, 92255 ]


// PUT     /api/v1/post/:postId
// {
//     title: "updated title",
//     text: "updated text"
// }

router.put('/emply/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    if (!req.body.text
        && !req.body.title) {
        res.status(403).send(`required parameter missing, atleast one key is required.
        example put body: 
        PUT     /api/v1/post/:postId
        {
            title: "updated title",
            text: "updated text"
        }
        `)
    }

    let dataToBeUpdated = {};

    if (req.body.title) { dataToBeUpdated.title = req.body.title }
    if (req.body.text) { dataToBeUpdated.text = req.body.text }


    try {
        const updateResponse = await col.updateOne(
            {
                _id: new ObjectId(req.params.postId)
            },
            {
                $set: dataToBeUpdated
            });
        console.log("updateResponse: ", updateResponse);

        res.send('post updated');
    } catch (e) {
        console.log("error inserting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})

// DELETE  /api/v1/post/:userId/:postId
router.delete('/employ/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }


    try {
        const post = await col.findOne({_id : new ObjectId(req.params.postId)})
        const filePath = 'https://firebasestorage.googleapis.com/v0/b/yacht-ecommerce.appspot.com/o/images%2Femployees%2Fbanner-1.jpg?alt=media&token=5c89c08f-ecee-4149-960d-a7c420d31d6b&_gl=1*170cxmi*_ga*MTk1MzE4MjAwNC4xNjg4NjU5NjI4*_ga_CW55HF8NVT*MTY5NjE0OTkwOC4zNy4xLjE2OTYxNTYzNDEuNjAuMC4w'; 
        console.log("file path iss heree    ",filePath)
    if (filePath) {
        // Delete the file from the server folder
        
            try {
              // Get a reference to the Firebase Storage bucket
  const bucket = admin.storage().bucket();
          
              // Define the file path to the image you want to delete
              const file = bucket.file(filePath);
          
              // Check if the file exists
              const exists = await file.exists();
          
              if (exists[0]) {
                // If the file exists, delete it
                await file.delete();
                console.log(`Image at ${filePath} deleted from Firebase Storage.`);
              } else {
                console.log(`Image at ${filePath} not found in Firebase Storage.`);
              }
            } catch (error) {
              console.error('Error deleting image from Firebase Storage:', error);
            }
          
      }

        const deleteResponse = await col.findOneAndDelete({ _id: new ObjectId(req.params.postId) });

        deleteResponse ? res.send('post deleted') : res.status(404).send('no post found')
        console.log("deleteResponse: ", deleteResponse);
    } catch (e) {
        console.log("error deleting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})

export default router