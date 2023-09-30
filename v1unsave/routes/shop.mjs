import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()


router.get('/shop', (req,res)=>{

    res.sendFile(path.join(__dirname , 'pages/shop.html'))
})
export default router