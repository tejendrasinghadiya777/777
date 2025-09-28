const constants = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Failed",
        message: err.message,
        // stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not Found",
        message: err.message,
        // stackTrace: err.stack,
      });
      break;
    case constants.TOO_MANY_REQUESTS:
     res.status(statusCode).json({
        title: "Too Many Requests",
        message: err.message,
        // stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        message: err.message,
        // stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        message: err.message,
        // stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Server Error",
        message: err.message,
        // stackTrace: err.stack,
      });
      break;
    // default:
    //console.log("No Error, All good !");
  }
};


const jsonHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400);
    throw new Error("Invalid JSON");
  }
  next(err);
}
module.exports = {jsonHandler,errorHandler}
