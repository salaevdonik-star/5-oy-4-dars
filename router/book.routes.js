const {Router} = require("express")
const { getAllBooks, getOneBook, search, addBook, updateBook, deleteBook } = require("../controller/book.controller")
const authorization = require("../middleware/authorization")
const adminChecker = require("../middleware/admin.checker")

const bookRouter = Router()

bookRouter.get("/get_all_books", authorization, getAllBooks)
bookRouter.get("/get_one_book/:id", authorization, getOneBook)
bookRouter.get("/search", authorization, search)
bookRouter.post("/add_book", adminChecker, addBook)
bookRouter.put("/update_book/:id", adminChecker, updateBook)
bookRouter.delete("/delete_book/:id", adminChecker, deleteBook)

module.exports = bookRouter