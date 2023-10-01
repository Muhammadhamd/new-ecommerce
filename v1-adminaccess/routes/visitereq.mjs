
import express from "express"
import path from "path"
import { ObjectId } from "mongodb"
import nodemailer from "nodemailer"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"
import { Console } from "console"

const db = client.db("yacht"),
      visiteReqCol = db.collection('visitreq');

      import cron from "node-cron"; // Import node-cron for scheduling

      cron.schedule("0 0 * * *", async () => {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      
        try {
          // Remove records older than 2 minutes
          await visiteReqCol.deleteMany({
            status: "declined",
            updatedAt: { $lt: fiveDaysAgo },
          });
          console.log("Removed records older than 2 minutes.");
        } catch (error) {
          console.error("Error removing records:", error);
        }
      });
      
   


// Add this route to your existing Express application
router.put("/update-status-visite-req/:requestId", async (req, res) => {
      const {status} = req.body
      console.log(status)
      const requestId = req.params.requestId
  try {


    const updatedAt = new Date() // Set declinedAt if status is "declined"
       
       // Update the status of the tour request
       const updatedRequest = await visiteReqCol.findOneAndUpdate(
         { _id: new ObjectId(requestId) },
         { $set: { status,updatedAt } },
         { returnOriginal: false }
       );
   
       if (!updatedRequest) {
         res.status(404).send("Tour request not found");
         return;
       }
   
       res.status(200).send(`status updated to${ status }`);
     } catch (error) {
       console.error("Error updating status:", error);
       res.status(500).send("An error occurred while updating the status");
     }
  });
  router.get("/visite-requests", async(req,res ,next)=>{

    const requests =await visiteReqCol.find({}).toArray()
   res.send(requests)
     
})
router.get("/count-visit-requests", async(req,res ,next)=>{

  const reqs = await visiteReqCol.countDocuments()
  res.json({ count: reqs });
   
})
router.get("/admin/visit-requests",(req,res) =>{

  res.sendFile(path.join(__dirname , "pages/visitereqDb.html"))
})
  export default router
  