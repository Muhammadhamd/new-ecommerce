import express from "express"
import { client } from '../../db/mongodb.mjs'

const router = express.Router()
const db = client.db("yacht")
const userBlogs = db.collection("userBlog")
const userRevs = db.collection("userReview")


router.get("/get-blogs-home", async (req, res) => {
    try {
        const data = await userBlogs.find({}).toArray()
        return res.send(data)
    } catch (error) {
        return res.send("error occured")
    }
})

router.get("/get-revs-home", async (req, res) => {
    try {
        const data = await userRevs.find({}).toArray()
        return res.send(data)
    } catch (error) {
        return res.send("error occured")
    }
})

export default router;