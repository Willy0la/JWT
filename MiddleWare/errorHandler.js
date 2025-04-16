import constants from "../constant/constant.js";

const errorHandler = (err, req, res, next) => {
  console.log("This is error", err);

  const statusCode = err.statusCode;

  console.error(err.stack);

  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: " Not Found ",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.CONFLICT:
      res.json({
        title: "Resources Already exists",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      res.json({
        title: "No error",
        message: "All working fine",
      });
      break;
  }
};

export default errorHandler