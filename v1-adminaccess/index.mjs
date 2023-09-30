import express from 'express'
const router = express.Router()
import reviewHomeRoutes from './routes/reviewRoute.mjs'
import userblogroute from "./routes/userBlogRoute.mjs"
import postRoutes from './routes/post.mjs'
import visitereqRoutes from './routes/visitereq.mjs'
import tourreqRoutes from './routes/tourreq.mjs'
import subscribersRoutes from './routes/subscribers.mjs'
import shipcaptionRoutes from './routes/OurShipCaptions.mjs'
import reviewRoutes from './routes/review.mjs'
import quotereq from "./routes/quotereq.mjs"
import emploiesreq from "./routes/ouremployes.mjs"
import setEmailRoute from "./routes/setemail.mjs"
import valutionrequesteRouter from "./routes/getavalution.mjs"
import adminauthRoute from "./routes/auth.mjs"
router.use(adminauthRoute)
router.use(valutionrequesteRouter)
router.use(reviewHomeRoutes)
router.use(userblogroute)
router.use(emploiesreq)
router.use(setEmailRoute)
router.use(quotereq)
router.use(reviewRoutes)
router.use(shipcaptionRoutes)
router.use(subscribersRoutes)
router.use(tourreqRoutes)
router.use(visitereqRoutes)
router.use(postRoutes)
export default router