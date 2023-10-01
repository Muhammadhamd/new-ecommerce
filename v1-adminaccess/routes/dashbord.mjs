import express from 'express'
import path from 'path'
import jwt from "jsonwebtoken"
const __dirname = path.resolve()
const SECRET = process.env.Secret || 'topsecret'
const router = express.Router()


router.get('/admin', (req,res)=>{
 
   
    res.sendFile(path.join(__dirname , 'pages/dashbord.html'))
})

router.get("/Adminlogout",(req, res) => {

    res.cookie('AdminToken', '', {
         maxAge: 1,
         httpOnly: true
     });
 
     res.send("Logout successful" );
     console.log(req.cookies)
 })
export default router