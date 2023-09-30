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
      postsCol = db.collection('product')


   






      router.delete('/review/:postId/:reviewId', async (req, res, next) => {
        try {
            const postId = req.params.postId;
            const reviewId = req.params.reviewId;
    console.log(
      postId,
      reviewId
    )
            if (!ObjectId.isValid(postId)) {
                return res.status(400).send('Invalid post ID');
            }
    
            if (!ObjectId.isValid(reviewId)) {
                return res.status(400).send('Invalid review ID');
            }
    
            const post = await postsCol.findOne({ _id: new ObjectId(postId) });
    
            if (!post) {
                return res.status(404).send('Post not found');
            }
    
            const reviewIndex = post.reviews.map((review) =>review.id === new ObjectId(reviewId));


            // Remove the review from the array
            if (reviewIndex) {
              await postsCol.updateOne(
                { _id: new ObjectId(postId) },
                { $pull: { 'reviews': { 
                  id: new ObjectId(reviewId)
                } ,
                
                } 
            }
              );
              res.send("review deleted")
    return        
            }
           res.status(404).send('no review found')
            // Update the document in the collection
    
        } catch (error) {
            console.error('Error deleting review:', error);
            return res.status(500).send('Internal server error');
        }
    });
    
router.get("/products",async(req,res)=>{

  const data =await productsCol.find({}).toArray()
res.send(data)
})


export default router