const {Router} = require("express")
const adminChecker = require("../middleware/admin.checker")
const { updateCitation, deletCitation, addCitation } = require("../controller/citation.controller")

const citationRouter = Router()

citationRouter.post("/add_citation", adminChecker, addCitation)
citationRouter.put("/update_citation/:id", adminChecker, updateCitation)
citationRouter.delete("/delete_citation/:id", adminChecker, deletCitation)

module.exports = citationRouter