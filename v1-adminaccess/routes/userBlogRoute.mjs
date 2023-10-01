import express from 'express'
import { ObjectId } from 'mongodb'
import { client } from '../../db/mongodb.mjs'
import multer from 'multer'
import fs from "fs"
import path from "path"
const __dirname = path.resolve()
const router = express.Router()

const db = client.db("yacht")
const userBlog = db.collection("userBlog")
import admin from "firebase-admin"


  const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
    },
  });
  

router.post('/create-blog', upload.single('head-image'), async (req, res, next) => {
    const title = req.body.text
    const description = req.body.description
    console.log(title)
    console.log(description)
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded")
        }
        const bucket = admin.storage().bucket();
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

        await userBlog.insertOne({
            title: title,
            description: description,
            image: publicUrl

        })

    } catch (error) {
        console.log(error)
        return res.json({"message": "error occured"})
    }
    return res.status(200).json({"message": "review inserted"})
})

router.get('/get-blogs', async (req, res) => {
    try {
        const revs = await userBlog.find({}).toArray()
        console.log(revs);
        return res.send(revs)
    } catch (error) {
        return res.json({"error": "error occurred"})
    }
})

router.delete('/delete-blog/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const reqId = req.params.id;

        
  
        const deleteReq = await userBlog.findOneAndDelete({
            _id: new ObjectId(reqId),
        })

        if (!deleteReq) {
            return res.status(404).send("no item with id to delete")
        }
        

        return res.status(200).json({"message": "deleted successfully"})
    } catch (error) {
        return res.json({"error": "error occurred in deleting"})
    }
})
export default router