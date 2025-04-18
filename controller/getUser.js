import Consumer from "../model/user.js";

import asyncHandler from "express-async-handler";

import constants from "../constant/constant.js";

const getAllUser = asyncHandler(async (req, res, next) => {
  try {
    const getAll = await Consumer.find();

    
    res.json({
      message: "All Users",
      data: getAll,
      success: true,
    });
  } catch (error) {
    const customError = new Error("Unable to Get All User");
    customError.statusCode = constants.INTERNAL_SERVER_ERROR;
    return next(customError);
  }
});

export default getAllUser;
