import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()


router.get('/home', (req,res)=>{

    res.sendFile(path.join(__dirname , 'home.html'))
})
export default router