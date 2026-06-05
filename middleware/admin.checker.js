const CustomErrorHandler = require("../error/error");
const jwt = require("jsonwebtoken");

module.exports = function adminChecker(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw CustomErrorHandler.BadRequest("Token not found");
    }

    const bearer = token.split(" ")[0];
    const partOfToken = token.split(" ")[1];

    if (bearer !== "Bearer" || !partOfToken) {
      throw CustomErrorHandler.BadRequest("Bearer not found");
    }

    const decode = jwt.verify(partOfToken, process.env.SECRET_KEY);

    req.user = decode;

    if (req.user.role !== "admin" && req.user.role !== "superAdmin") {
      throw CustomErrorHandler.Forbidden("you are not admin or superadmin");
    }

    next();
  } catch (error) {
    next(error);
  }
};
