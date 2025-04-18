import Consumer from "../model/user.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import asyncHandler from "express-async-handler";
import constants from "../constant/constant.js";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

const login = asyncHandler(async (req, res, next) => {

  const { username, password } = req.body;

  // This conditions check if the required field is filled
  if (!username || !password) {


    //this throws a new error on what is going on
    const error = new Error("All field are Required");


    error.statusCode = constants.BAD_REQUEST;
    return next(error);

  }

  

  const user = await Consumer.findOne({username:username});

  if (!user) {

    const error = new Error("User with this username does not exist ");
    error.statusCode = constants.UNAUTHORIZED;
    return next(error);

  }

  const comparePassword =await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    const error = new Error("Password incorrect, input the correct password ");
    error.statusCode = constants.UNAUTHORIZED;
    return next(error);
  }


  const token = jwt.sign({id:user._id}, process.env.ACCESS_TOKEN, {expiresIn:"1h"})
  user.token = token

  const option = {
    expires :new Date(Date.now()+ 3*24*60 *60*1000),
    httpOnly:true
  }
  res.status(201).json({
    message:"User logged in",
    token: "token collected",
    data: user.username,
    success:true,
    option:option

  })
});


export default login


