import express from "express"
import path from "path"
import { ObjectId } from "mongodb"
import nodemailer from "nodemailer"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "../../db/mongodb.mjs"

const db = client.db("yacht"),
      listCol = db.collection("wishlist"),
      postcol =db.collection('product')
      router.post('/api/v1/add-wishlist', async (req, res) => {

        if (!req?.cookies?.Token) {
          return res.status(401).send("login as a user to use this feature")
        }
        const CurrentuserId = req.decodedData._id;
        const { postid } = req.body;
      
        try {
          // Check if the wishlist for the user already exists
          const wishlist = await listCol.findOne({ userId: CurrentuserId });
      
          if (!wishlist) {
            // If the wishlist doesn't exist, create a new one
            await listCol.insertOne({
              userId: CurrentuserId,
              wishListData: [
                {
                  postId: postid,
                },
              ],
            });
          } else {
            // If the wishlist already exists, check if the post is already in the wishlist
            const matchItem = wishlist.wishListData.find((item) => item.postId.toString() === postid);
            console.log("gag",matchItem)
      
            if (matchItem) {

                await listCol.updateOne(
                    { userId: CurrentuserId },
                    { $pull: { 'wishListData': { postId: postid } } }
                  );
                  return res.json({'Added':false});
            }
      
            // Add the new post ID to the wishlist
            await listCol.updateOne(
              { userId: CurrentuserId },
              { $push: { 'wishListData': { postId: postid } } }
            );
          }
      
          return res.json({'Added':true});
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        }
      });



      router.get('/api/v1/wishlistdata', async (req, res) => {
        if (!req?.cookies?.Token) {
          return res.status(401).send("login as a user to use this feature")
        }
        const CurrentuserId = req.decodedData._id;
      
        try {
          // Find the user's wishlist
          const wishlist = await listCol.findOne({ userId: CurrentuserId });
      
          if (!wishlist) {
            return res.send('Wishlist is empty');
          }
      
          // Extract post IDs from the wishlist
          const postIds = wishlist.wishListData.map((item) => new ObjectId(item.postId));

          // Query the "posts" collection to fetch post data based on post IDs
          const posts = await postcol.find({ _id: { $in: postIds } }).toArray()

          console.log(posts)
          res.send(posts);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        }
      });
      
      router.get("/api/v1/check-post-is-in-wishlist/:id", async(req,res)=>{
        if (!req?.cookies?.Token) {
          return res.status(401).send("login as a user to use this feature")
        }
        const CurrentuserId = req.decodedData._id;
        const postid = req.params.id
        const wishlist = await listCol.findOne({ userId: CurrentuserId });

        const matchItem = wishlist?.wishListData.find((item) => item.postId.toString() === postid);

        if (matchItem) {
          return res.json({'Added':true});
           
        }
        return res.json({'Added':false});

      })
      router.get("/wishlist",(req,res)=>{
        if (!req?.cookies?.Token) {
          return res.status(401).send("login as a user to use this feature")
        }
        res.sendFile(path.join(__dirname,"pages/wishlist.html"))
      })
      router.delete(`/api/v1/remove-wishlist/:id`,async(req,res)=>{
        const wishlistid = req.params.id
        const userid = req?.decodedData?._id
        const list = await listCol.findOne({userId: userid })

       const match = list?.wishListData?.map((id)=> id.postId.toString() === wishlistid)
      

       try {
        if (match) {
        
          listCol.updateOne(
            {userId:userid},
            { $pull: {"wishListData":{postId:wishlistid}} }
          )

          res.send("deleted")
         }

       } catch (error) {
        res.status(401).send("error arha ha")
        
       }

      })
      
    export default router