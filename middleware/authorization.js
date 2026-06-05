const CustomErrorHandler = require("../error/error");
const jwt = require("jsonwebtoken")

module.exports = function authorization(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw CustomErrorHandler.BadRequest("Token not found");
    }

    const bearer = token.split(" ")[0];
    const partOfToken = token.split(" ")[1];

    if(bearer !== "Bearer" || !partOfToken) {
      throw CustomErrorHandler.BadRequest("Bearer not found");
    }

    const decode = jwt.verify(partOfToken, process.env.SECRET_KEY)

    req.user = decode

    next()

  } catch (error) {
    next(error);
  }
};
