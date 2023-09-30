import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()


router.get('/did-you-know', (req,res)=>{

    res.sendFile(path.join(__dirname , 'pages/didyouknow.html'))
})
export default router