

import User from "../models/userModel.js";
import bcrypt from 'bcrypt'



const createUser= async(req,res)=>{

    try {
        const { username, email, password } = req.body;
    
        if (!username || !email || !password)
          return res.status(401).json({type:false, msg: "all fileds required" });
    
        let existUser = await User.findOne({ email });
    
        if (existUser) return res.status(401).json({type:false, msg: "email already taken" });
    
        
        const hashingpassword = bcrypt.hashSync(password,10)
    
        // save user to database--
        const user = await User.create({ username, email, password: hashingpassword });
        // console.log(user)
    
        // create token--
        // const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    
        // Respond with token and redirect to home page
        res.status(200).json({type:true,msg:'registration successfull'});
      } catch (error) {
        res.status(500).json({
          type:false,
          msg:`please try again later`
        })
        console.log(`account create failed ${error}`);
      }



}



export {createUser}