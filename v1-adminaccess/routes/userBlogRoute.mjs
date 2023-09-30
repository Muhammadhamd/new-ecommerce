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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/blogimage'); // Uploads will be stored in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });


router.post('/create-blog', upload.single('head-image'), async (req, res, next) => {
    const title = req.body.text
    const description = req.body.description
    console.log(title)
    console.log(description)
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded")
        }
        const uploadedFile = req.file;
        const imagePath = uploadedFile.path;

        await userBlog.insertOne({
            title: title,
            description: description,
            image: imagePath

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

        const post = await userBlog.findOne({_id : new ObjectId(req.params.id)})
        const filePath = post.image; 
        console.log(filePath)
    if (filePath) {
        // Delete the file from the server folder
        const imagePath = path.join(__dirname,  filePath);
        fs.unlinkSync(imagePath);
      }

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