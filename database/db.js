import mongoose from "mongoose"
import asyncHandler from "express-async-handler"

const connectDb = asyncHandler(async()=>{
    try {
        await mongoose.connect(process.env.DB)
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to Database")
        process.exit(1)
    }
    
   
})

export default connectDb