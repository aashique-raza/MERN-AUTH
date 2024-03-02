
import { createUser } from "../controller/authController.js";

import { Router } from "express";


const router=Router()


router.post('/signup',createUser)


export default router