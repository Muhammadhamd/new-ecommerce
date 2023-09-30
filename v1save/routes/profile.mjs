import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()


router.get('/profile', (req,res)=>{
    if (!req?.cookies?.Token) {
        return res.status(401).send("login as a user to use this feature")
      }
    res.sendFile(path.join(__dirname , 'pages/profile.html'))
})
export default router