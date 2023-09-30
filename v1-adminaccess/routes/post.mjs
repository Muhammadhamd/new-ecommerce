import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"

const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"

const db = client.db("yacht"),
      userCol = db.collection("users"),
      postsCol = db.collection('getAvalution'),
      productCol = db.collection('product')

      import cron from "node-cron"; // Import node-cron for scheduling

      cron.schedule("0 0 * * *", async () => {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      
        try {
          // Remove records older than 2 minutes
          await postsCol.deleteMany({
            status: "declined",
            updatedAt: { $lt: fiveDaysAgo },
          });
          console.log("Removed records older than 2 minutes.");
        } catch (error) {
          console.error("Error removing records:", error);
        }
      });
      
      
// DELETE  /api/v1/post/:userId/:postId
router.delete('/delete-product/:postId', async (req, res, next) => {

  if (!ObjectId.isValid(req.params.postId)) {
      res.status(403).send(`Invalid post id`);
      return;
  }

  try {
      const deleteResponse = await productCol.deleteOne({ _id: new ObjectId(req.params.postId) });
      console.log("deleteResponse: ", deleteResponse);
      res.send('post deleted');
  } catch (e) {
      console.log("error deleting mongodb: ", e);
      res.status(500).send('server error, please try later');
  }
})


router.put("/update-status-valution-req/:requestId", async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
  

    try {


   const updatedAt = new Date() // Set declinedAt if status is "declined"
      
      // Update the status of the tour request
      const updatedRequest = await postsCol.findOneAndUpdate(
        { _id: new ObjectId(requestId) },
        { $set: { status,updatedAt } },
        { returnOriginal: false }
      );
  
      if (!updatedRequest) {
        res.status(404).send("valuotion request not found");
        return;
      }
  
      res.status(200).send(`status updated to${ status }`);
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).send("An error occurred while updating the status");
    }
  });

router.get("/valutiondata",async(req,res)=>{

    const data =await postsCol.find({}).toArray()
 res.send(data)
})


router.post('/publish-product',async(req,res)=>{

  //  const  reqId = req.params.id
  //  const status = "Approved"
  //  const updatedRequest = await postsCol.findOneAndUpdate(
  //   { _id: new ObjectId(reqId) },
  //   { $set: { status,updatedAt } },
  //   { returnOriginal: false }
  // );

  // const inserting_post = await postsCol.findOne({ _id: new ObjectId(reqId) })
  
const {boatName , boatimage , description , totalPrice , issale , price} = req.body

console.log(req.body)



  try {
      
    const data = await productCol.insertOne({
    boatName:boatName,
    boatimage:boatimage,
    description:description,
    issale:issale,
    price:price,
    totalPrice:Math.floor(price - (price * issale /100)),
    timestamp: new Date()
   })

   res.send(data)
  } catch (error) {
    res.status(500).send("error having")
  }
  
})
router.get("/countValution", async(req,res ,next)=>{

    const subscribers = await postsCol.countDocuments()
    res.json({ count: subscribers });
     
})
router.get("/countproducts", async(req,res ,next)=>{

    const subscribers = await productCol.countDocuments()
    res.json({ count: subscribers });
     
})
export default router