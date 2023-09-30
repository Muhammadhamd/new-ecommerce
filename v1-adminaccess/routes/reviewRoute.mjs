import express from 'express'
import { ObjectId } from 'mongodb'
import { client } from '../../db/mongodb.mjs'

const router = express.Router()

const db = client.db("yacht")
const userReview = db.collection("userReview")



router.post('/create-card-review', async (req, res, next) => {
    const name = req.body.name
    const description = req.body.description
    console.log(name)
    console.log(description)
    try {
        await userReview.insertOne({
            name: name,
            description: description
        })
    } catch (error) {
        console.log(error)
        return res.json({"message": "error occured"})
    }
    return res.status(200).json({"message": "review inserted"})
})

router.get('/get-card-reviews', async (req, res) => {
    try {
        const revs = await userReview.find({}).toArray()
        console.log(revs);
        return res.send(revs)
    } catch (error) {
        return res.json({"error": "error occurred"})
    }
})

router.delete('/delete-cart-review/:id', async (req, res) => {
    try {
        const reqId = req.params;
        const deleteReq = await userReview.findOneAndDelete({
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