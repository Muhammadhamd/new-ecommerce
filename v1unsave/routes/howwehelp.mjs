import express from 'express'
import path from 'path'
const router = express.Router()
const __dirname = path.resolve()


router.get('/help', (req,res)=>{

    res.sendFile(path.join(__dirname , 'pages/howWeHelp.html'))
})
export default router