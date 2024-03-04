
import { createUser,signin,google,signout } from "../controller/authController.js";

import { Router } from "express";


const router=Router()


router.post('/signup',createUser)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signout',signout)


export default router