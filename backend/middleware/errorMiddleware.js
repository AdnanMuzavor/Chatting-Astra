//We are going to use this function i.e app.use(notFound) just after routes so
//if any error occurs it'll display it

//When user not found
const notFound = (req, res, next) => {
  const error = new Error(`Not found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

//Then call will go to errorHandler function
const errorHandler = (err, req, res, next) => {
  //Status code will be set to 500 which means no error if res 's status code is 200 which implies no error
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
