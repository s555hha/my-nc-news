
function psqlErrorHandler (err, req, res, next)  {
  if (err.code === "22P02" || err.code === "23503") {
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
};

function notFoundErrorHandler (req, res) {
    res.status(404).send({ message: "Sorry Not Found" });
  }
  
 function customErrorsHandler (err, req, res, next) {
    if (err.status && err.message) {
      res.status(err.status).send({ message: err.message });
    } else {
      next(err);
  };
}
  function serverErrorHandler(err, req, res, next) {
    res.status(500).send({ msg: "Internal Server Error" });
  };

  module.exports = {notFoundErrorHandler, psqlErrorHandler, customErrorsHandler, serverErrorHandler}