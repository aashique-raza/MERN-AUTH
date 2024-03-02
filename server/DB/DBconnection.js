

import mongoose from "mongoose";


const DBconnection=async(uri)=>{
    try {

      await  mongoose.connect(uri)

      console.log(`db connected successfully`)
        
    } catch (error) {
        console.log(`db connection failed ${error}`)
    }
}

export default DBconnection