import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"
import nodemailer from "nodemailer"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"
import { Console } from "console"

const db = client.db("yacht"),
      visiteReqCol = db.collection('getaquote');


   


      router.put("/update-status-quote-req/:requestId", async (req, res) => {
        const { requestId } = req.params;
        const { status } = req.body;
      
    
        try {
    
    
       const updatedAt = new Date() // Set declinedAt if status is "declined"
          
          // Update the status of the tour request
          const updatedRequest = await visiteReqCol.findOneAndUpdate(
            { _id: new ObjectId(requestId) },
            { $set: { status,updatedAt } },
            { returnOriginal: false }
          );
      
          if (!updatedRequest) {
            res.status(404).send("quote request not found");
            return;
          }
      
          res.status(200).send(`status updated to${ status }`);
        } catch (error) {
          console.error("Error updating status:", error);
          res.status(500).send("An error occurred while updating the status");
        }
      });
      router.get("/quote-requests", async(req,res ,next)=>{
    
        const requests =await visiteReqCol.find({}).toArray()
       res.send(requests)
         
    })


      router.get("/quote-requests-count", async(req,res ,next)=>{
        const currentUser = req.decodedData
        const userid = currentUser._id

       const reqs = await visiteReqCol.countDocuments()
        res.json({ count: reqs });
         
      })
      
  
       
    




export default router