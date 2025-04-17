import Consumer from "../model/user.js";

import asyncHandler from "express-async-handler";

import constants from "../constant/constant.js";
import mongoose from "mongoose";

const update = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
   
    if(!mongoose.Types.ObjectId.isValid(id)){

      const error = new Error("Invalid ID format")
      error.statusCode = constants.BAD_REQUEST
      return next(error)
    }

    const userUpdate = await Consumer.findByIdAndUpdate(id, req.body, {new:true})
    
    if(!userUpdate){
      const error = new Error("User not found")
      error.statusCode = constants.NOT_FOUND
      return next(error)
    }

    
    return res.json({
      message: "User Updated", userUpdate,
     
      success: true,
    });

   
  } catch (error) {
    const customError = new Error("Unable to Update User");
    customError.statusCode = constants.INTERNAL_SERVER_ERROR;
    return next(customError);
  }
});

export default update;

