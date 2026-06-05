const { Router } = require("express");
const {
  getAllQuotes,
  getOneQuote,
  getQuotesByBook,
  addQuote,
  deleteQuote,
} = require("../controller/quote.controller");
const authorization = require("../middleware/authorization");
const adminChecker = require("../middleware/admin.checker");
const quoteValidateMiddleware = require("../middleware/quote.validate.middleware");

const quoteRouter = Router();

quoteRouter.get("/get_all_quotes", authorization, getAllQuotes);
quoteRouter.get("/get_one_quote/:id", authorization, getOneQuote);
quoteRouter.get("/get_quotes_by_book/:book_id", authorization, getQuotesByBook);
quoteRouter.post("/add_quote", adminChecker, quoteValidateMiddleware, addQuote);
quoteRouter.delete("/delete_quote/:id", adminChecker, deleteQuote);

module.exports = quoteRouter;
