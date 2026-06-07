const {Router} = require("express")
const { register, verify, login, logout } = require("../controller/auth.controller")
const authValidateMiddleware = require("../middleware/auth.validate.middleware")
const refreshToken = require("../middleware/refresh-token")

const authRouter = Router()

authRouter.post("/register", authValidateMiddleware, register)
authRouter.post("/verify", verify)
authRouter.post("/login", login)
authRouter.get("/refresh", refreshToken)
authRouter.get("/logout", logout)

module.exports = authRouter