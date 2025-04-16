import Consumer from "../model/user.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler"
import errorHandler from "../MiddleWare/errorHandler.js";
import constants from "../constant/constant.js";
import validator from "validator"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const register = asyncHandler(async(req,res,next)=>{

    try {
        const{username,firstname, lastname, email, password } = req.body

    if(!username || !firstname || !lastname || !email ||!password ){
        const error = new Error("All fields are Required");
        error.statusCode = constants.BAD_REQUEST;

        return next(error)
    }

    if(!validator.isEmail(email)){
        const error = new Error("Invalid Email format")
        error.statusCode = constants.BAD_REQUEST
        return next(error)
    }

    const exisitingUser = await Consumer.findOne({username})
    if(exisitingUser){
        const error = new Error("Username Already exists");
        error.statusCode = constants.CONFLICT;
        return next(error)

    }

    const existingEmail = await Consumer.findOne({ email });
if (existingEmail) {
    const error = new Error("Email already in use");
    error.statusCode = constants.CONFLICT;
    return next(error);
}

    const hashedPassword = await bcrypt.hash(password,12)

    const newUser = await Consumer.create({
        username:username,
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:hashedPassword


    })
   
    const token = jwt.sign({id:newUser._id}, process.env.ACCESS_TOKEN, {expiresIn:"2h"}, )

    newUser.token = token,
    newUser.password = undefined

    return res.status(201).json({
            message:"User registered",
        data:{
            username: newUser.username,
            firstname:newUser.firstname,
            lastname:newUser.lastname,
            email:newUser.email,
            token:token
        },
        success:true
    

    })
        
    } catch (error) {
        const customError = new Error("Unable to Register User");
        customError.statusCode = constants.INTERNAL_SERVER_ERROR;
        return next(customError)
    }
    
})

export default register