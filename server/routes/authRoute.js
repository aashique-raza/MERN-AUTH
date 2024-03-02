
import { createUser,signin } from "../controller/authController.js";

import { Router } from "express";


const router=Router()


router.post('/signup',createUser)
router.post('/signin',signin)


export default router