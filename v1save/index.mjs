import express from 'express'
const router = express.Router()
import reqvisiterouter from "./routes/visiteReq.mjs"
import postrouter from "./routes/post.mjs"
import tourReqrouter from "./routes/tourReq.mjs"
import wishlistRoute from "./routes/wishlist.mjs"
import getaquoteRoute from "./routes/getaquote.mjs"
import profilerouter from "./routes/profile.mjs"

router.use(reqvisiterouter)
router.use(profilerouter)
router.use(getaquoteRoute)
router.use(tourReqrouter)
router.use(postrouter)
router.use (wishlistRoute)

export default router