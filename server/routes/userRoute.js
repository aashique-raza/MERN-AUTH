


import { Router } from "express";
import { verifyToken } from "../utility/userVerify.js";
import {updateUser} from '../controller/userController.js'


const router=Router()



router.get('/',(req,res)=>{

    res.json({msg:'hiii'})
})

router.post('/update/:id', verifyToken, updateUser);




export default router