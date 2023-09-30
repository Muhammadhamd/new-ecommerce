import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()


router.get('/service', (req,res)=>{

    res.sendFile(path.join(__dirname , 'pages/services.html'))
})
export default router