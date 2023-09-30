
import express from 'express';
import { client } from '../../db/mongodb.mjs'
import { ObjectId } from 'mongodb'

const db = client.db("yacht");
const col = db.collection("employe");

let router = express.Router()

router.get('/employes', async (req, res, next) => {

    const cursor = col.find({})
        .sort({ _id: -1 })
        .limit(4);

    try {
        let results = await cursor.toArray()
        console.log("results: ", results);
        res.send(results);
    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})

export default router
