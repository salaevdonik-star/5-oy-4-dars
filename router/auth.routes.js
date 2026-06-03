const { Router } = require("express");
const { register, login } = require("../controller/auth.controller");
const authValidateMiddleware = require("../middleware/auth.validate.middleware");

const authRouter = Router();

authRouter.post("/register", authValidateMiddleware("register"), register);
authRouter.post("/login", authValidateMiddleware("login"), login);

module.exports = authRouter;
