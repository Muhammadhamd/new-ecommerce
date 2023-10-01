
import express from 'express';
import { client } from '../../db/mongodb.mjs'
import { ObjectId } from 'mongodb'
import multer from 'multer'
import path from "path"
const __dirname = path.resolve()
import fs from "fs"
import admin from "firebase-admin"
import dotenv from 'dotenv';
// import deleteImageFromStorage from "./deleteImageFunction.mjs";
dotenv.config(); 

const db = client.db("yacht");
const col = db.collection("shipcaption");

let router = express.Router()


  const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
    },
  });
  

// POST    /api/v1/post
router.post('/add-ship-caption', upload.single('head-image'),  async (req, res, next) => {


    console.log(req.body)
    const { image, name, email, instagramLink, twitterLink, facebookLink, linkedinlink, phonenumber } = req.body
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded")
        }
        const bucket = admin.storage().bucket();
        const file = req.file;
        const originalname = `${Date.now()}-${file.originalname}`;
        const fileBuffer = file.buffer;
        
        // Define the path where you want to store the file in Firebase Storage.
        const filePath = `images/captions/${originalname}`;

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
    

        const socialMediaLinks = {
            Instagram: instagramLink,
            fascebook: facebookLink,
            linkedin: linkedinlink,
            twitter: twitterLink,
        }
        const insertResponse = await col.insertOne({
            // _id: "7864972364724b4h2b4jhgh42",
            Name: name,
            phonenumber: phonenumber,
            email: email,
            socialMediaLinks,
            image:publicUrl
        });
        console.log("insertResponse: ", insertResponse);

        res.send('post created');
    } catch (e) {
        console.log("error inserting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})




// [92133,92254, 92255 ]


// PUT     /api/v1/post/:postId
// {
//     title: "updated title",
//     text: "updated text"
// }

router.put('/ship-caption/:postId', async (req, res, next) => {

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
router.delete('/ship-caption/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    try {
        const post = await col.findOne({_id : new ObjectId(req.params.postId)})
       
    
        const deleteResponse = await col.findOneAndDelete({ _id: new ObjectId(req.params.postId) });

        deleteResponse ? res.send('post deleted') : res.status(404).send('no post found')
        console.log("deleteResponse: ", deleteResponse);
    } catch (e) {
        console.log("error deleting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})

export default router