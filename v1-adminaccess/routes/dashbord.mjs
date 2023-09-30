import express from 'express'
import path from 'path'
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser'
import bcrypt from "bcrypt"
const router = express.Router()
const __dirname = path.resolve()
const SECRET = process.env.Secret || 'topsecret'



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