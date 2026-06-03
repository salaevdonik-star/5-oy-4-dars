const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../error/error");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(CustomErrorHandler.UnAuthorized("Token topilmadi"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.user = decoded;
    next();
  } catch (error) {
    return next(CustomErrorHandler.UnAuthorized("Token noto'g'ri yoki muddati o'tgan"));
  }
};
