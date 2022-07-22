const throwError = (msg, status) => {
  let error = new Error(msg);
  error.statusCode = status;
  throw error;
};

module.exports = throwError;
