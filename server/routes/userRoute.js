


import { Router } from "express";
import { verifyToken } from "../utility/userVerify.js";
import {updateUser,deleteUser} from '../controller/userController.js'


const router=Router()



router.get('/',(req,res)=>{

    res.json({msg:'hiii'})
})

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);




export default router