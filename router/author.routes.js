const {Router} = require("express")
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor, search } = require("../controller/author.controller")
const authorValidateMiddleware = require("../middleware/author.validate.middleware")

const authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.get("/get_one_author/:id", getOneAuthor)
authorRouter.get("/search", search)
authorRouter.post("/add_author",authorValidateMiddleware, addAuthor)
authorRouter.put("/update_author/:id", updateAuthor)
authorRouter.delete("/delete_author/:id", deleteAuthor)

module.exports = authorRouter