const CustomErrorHandler = require("../error/error");

module.exports = function (err, req, res, next) {
  if (err instanceof CustomErrorHandler) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  if (err.name === "ValidationError") {
    let errors = err.message.split(",");
    return res.status(400).json({ message: "Validation error", errors });
  }

  return res.status(500).json({
    message: err.message || "Server xatosi",
  });
};
