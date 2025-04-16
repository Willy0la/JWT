import jwt from "jsonwebtoken";
import constants from "../constant/constant.js";


const authToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Access token missing");
    error.statusCode = constants.UNAUTHORIZED;
    return next(error);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      const error = new Error("Invalid Token");
      error.statusCode = constants.FORBIDDEN;
      return next(error);
    }
    req.user = user;
    next()
  });
};


export default authToken;