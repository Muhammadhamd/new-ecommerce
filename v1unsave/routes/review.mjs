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


   




const postsData = [
  {
    title: "hamd",
    text: "this is hamd",
    issale: false,
    price: 3000,
    id: '111',
    shipname: "Van Dutch 40 ",
    description: `
      1983 Custom
      !!!! REDUCED BY $200,000.00 !!!! Motivated Seller !!! BRING ALL
    
      MAGIC SPIRIT
    
      AMERICAN MADE HULL – CAN CHARTER IN
      Magic Spirit’ is the mother ship of her fleet, …consisting of 4 yachts varying in size that make up (Magic Yacht Charters) ‘MagicSpirit’ has an LOA of 133′ spread out across three decks, The largest Carter “SHIP” currently on the west coast of Canada. She easily accommodate a large crowd totaling a whopping 415 persons at capacity, with dining accommodations for 350 guests. a total of 4 Heads (bathrooms) (2 Men) (2 Ladies) A very large commercial-grade galley & appliances. Each level is Bar station equipped, Her top ‘Open’ deck is 3000 sqft. & equipped with a Bar station, Fridge & removable shelter top.. currently undergoing a fresh paint job.
    
      A 2020 survey on file (condition& Value )
      The Vancouver, BC based business (MAGIC YACHT CHARTERS) is also available should one wish to take over a well-established, long-standing Charter operation. (20 years strong) Located In the Heart of Vancouver in the (Westin Bayshore Marina) just off the Very popular Seawall & next to Coal Harbour Marina. Moored in a very desirable location she rests just in front of the ver
    
      Google rating of 4.3 out of 5 stars
      (Website Quote)
    
      Magic Yacht Charters’ fleet is spectacularly located at the Westin Bayshore Marina in Coal Harbour; and all four of the yachts are uniquely suited to hosting an event that leaves a lasting impression, be it for business or pleasure.
    `,
    reviews: [
      {
        name: "hamd",
        text: "Audio Sharing Is Compatible With Beats Flex, Solo Pro",
      },
      {
        name: "ali",
        text: "Audio Sharing Is Compatible With Beats Flex, Solo Pro",
      },
      {
        name: "ramal",
        text: "Audio Sharing Is Compatible With Beats Flex, Solo Pro",
      },
      {
        name: "hamd",
        text: "Audio Sharing Is Compatible With Beats Flex, Solo Pro",
      },
      {
        name: "hamd",
        text: "Audio Sharing Is Compatible With Beats Flex, Solo Pro",
      },
      // Add more review objects as needed
    ],
  },


 
]
router.post("/review/:id", async(req,res ,next)=>{
    const postid = req.params.id
    const {name , email , text} = req.body

console.log("data coming")
     

 
    const posts = await postsCol.findOne({_id : new ObjectId(postid)})

    
    await postsCol.updateOne(
        { _id: new ObjectId(postid) },
        { $push: { 'reviews': { 
          id: new ObjectId(),
            email: email,
            name:name,
           text:text
        } ,
        
        } 
    }
      );
    
    res.send("review uploaded")
})



// DELETE  /api/v1/post/:userId/:postId




export default router