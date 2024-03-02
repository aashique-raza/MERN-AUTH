

import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import DBconnection from './DB/DBconnection.js'
import router from './routes/userRoute.js'
import cors from 'cors'




const PORT=process.env.PORT || 3000

const app=express()

// middleware setup   
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


// load routes--

app.use('/api',router)




app.listen(PORT,()=>{
    console.log(`serevr is running on ${PORT}`)
    DBconnection(process.env.DATABASE_URI)
})