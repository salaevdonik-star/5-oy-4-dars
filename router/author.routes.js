const {Router} = require("express")
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authorValidateMiddleware = require("../middleware/author.validate.middleware")
const authorization = require("../middleware/authorization")
const adminChecker = require("../middleware/admin.checker")
const multer = require("../config/multer")

const authorRouter = Router()

authorRouter.get("/get_all_authors", authorization, getAllAuthors)
authorRouter.get("/get_one_author/:id", authorization, getOneAuthor)
authorRouter.get("/search", authorization, search)
authorRouter.post("/add_author", adminChecker, multer.single("upload_image"), authorValidateMiddleware, addAuthor)
authorRouter.put("/update_author/:id", adminChecker, updateAuthor)
authorRouter.delete("/delete_author/:id", adminChecker, deleteAuthor)

module.exports = authorRouter