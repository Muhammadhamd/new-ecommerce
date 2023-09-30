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


   



       
    

// router.post("/post", async(req,res)=>{

//     // const currentUserEmail = res.locals.decodedData


//     // const userData =await userCol.findOne({email:currentUserEmail})
//    const {title , description  , price , tag ,salesDecsount }= req.body

//    console.log(title , description  , price , tag , salesDecsount ,image)
// //    const post = await postModel.create({
// //     // username: userData.username,
// //     // userId: userData._id,
// //     // sellername:userData.name,
// //     price: price,
// //     tag: tag,
// //     timeStamp: new Date(),
// //     title: title,
// //     description: description,
// //     salesDiscount:salesDecsount
// // });
//    res.send("created")
// })
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


  {
    title:"ali",
    text:"this is hamd",
    issale:40,
    price:3000,
    id:'211'

  },
  {
    title:"ramal",
    text:"this is hamd",
    issale:false,
    price:3000
  },
  {
    title:"hamd",
    text:"this is hamd",
    issale:40,
    price:3000
  },
]
router.get("/posts", async(req,res ,next)=>{
    const searched = req.query.q;
    


     

 
    const posts = await postsCol.find({}).toArray()

    if(searched){
        const filteredPosts = posts.filter((post) => {
            // Check if 'post' is defined and has a 'title' property before calling 'toLowerCase'
            return post && post.boatName && post.boatName.toLowerCase().includes(searched.toLowerCase());
          });
          if(filteredPosts.length > -1){
            res.send(filteredPosts);
            return
        }
            res.status(404).send(`No post found with search=${searched}`)
            return
        
        
    }
    res.send(posts)
})
router.get("/post/:postId",async (req,res)=>{
    const postId = req.params.postId

  //  const post =  postsData.find(post=>post.id === postId)
    const post = await postsCol.findOne({ _id: new ObjectId(postId)})

    if (!post) {
        res.send("this post maybe deleted or disent exist")
        return;
    }
    res.sendFile(path.join(__dirname,"pages/single.html"))


    
      
})

router.get("/postdata/:postId",async(req ,res)=>{

    const postId = req.params.postId
    const post = await postsCol.findOne({ _id: new ObjectId(postId)})
    // const postdata = await postsCol.findOne({ _id: new ObjectId(postId)})
    res.send(post)
})


// router.put('/edit-post/:postId', async (req, res, next) => {

//   if (!ObjectId.isValid(req.params.postId)) {
//       res.status(403).send(`Invalid post id`);
//       return;
//   }

//   if (!req.body.text
//       && !req.body.title) {
//       res.status(403).send(`required parameter missing, atleast one key is required.
//       example put body: 
//       PUT     /api/v1/post/:postId
//       {
//           title: "updated title",
//           text: "updated text"
//       }
//       `)
//   }

//   let dataToBeUpdated = {};

//   if (req.body.title) { dataToBeUpdated.title = req.body.title }
//   if (req.body.text) { dataToBeUpdated.text = req.body.text }


//   try {
//       const updateResponse = await col.updateOne(
//           {
//               _id: new ObjectId(req.params.postId)
//           },
//           {
//               $set: dataToBeUpdated
//           });
//       console.log("updateResponse: ", updateResponse);

//       res.send('post updated');
//   } catch (e) {
//       console.log("error inserting mongodb: ", e);
//       res.status(500).send('server error, please try later');
//   }
// })

// DELETE  /api/v1/post/:userId/:postId
// router.delete('/delete-post/:postId', async (req, res, next) => {

//   if (!ObjectId.isValid(req.params.postId)) {
//       res.status(403).send(`Invalid post id`);
//       return;
//   }

//   try {
//       const deleteResponse = await postsCol.deleteOne({ _id: new ObjectId(req.params.postId) });
//       console.log("deleteResponse: ", deleteResponse);
//       res.send('post deleted');
//   } catch (e) {
//       console.log("error deleting mongodb: ", e);
//       res.status(500).send('server error, please try later');
//   }
// })

router.get("/products",async(req,res)=>{

  const data =await postsCol.find({}).toArray()
res.send(data)
})


export default router