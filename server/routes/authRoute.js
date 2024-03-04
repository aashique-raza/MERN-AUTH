
import { createUser,signin,google } from "../controller/authController.js";

import { Router } from "express";


const router=Router()


router.post('/signup',createUser)
router.post('/signin',signin)
router.post('/google',google)


export default router