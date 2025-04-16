import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import errorHandler from "./MiddleWare/errorHandler.js"
import connectDb from "./database/db.js"
import Router from "./router/Customer.js"
import authToken from "./MiddleWare/authToken.js"
import cookieParser from "cookie-parser";
dotenv.config()

const PORT = process.env.PORT || 2090
const app = express()

app.use(morgan('tiny'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectDb()
app.use("/api/v1/user", Router)

app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})

