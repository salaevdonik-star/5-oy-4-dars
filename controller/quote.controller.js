const CustomErrorHandler = require("../error/error");
const QuoteSchema = require("../schema/quote.schema");
const BookSchema = require("../schema/book.schema");

const getAllQuotes = async (req, res) => {
  try {
    const quotes = await QuoteSchema.find().populate(
      "book_id",
      "title author_info period genres"
    );

    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await QuoteSchema.findById(id).populate(
      "book_id",
      "title author_info period genres"
    );

    if (!quote) {
      throw CustomErrorHandler.NotFound("Quote not found");
    }

    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuotesByBook = async (req, res) => {
  try {
    const { book_id } = req.params;

    const book = await BookSchema.findById(book_id);
    if (!book) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    const quotes = await QuoteSchema.find({ book_id }).populate(
      "book_id",
      "title author_info period genres"
    );

    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addQuote = async (req, res) => {
  try {
    const { text, author_name, book_id } = req.body;

    const book = await BookSchema.findById(book_id);
    if (!book) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    await QuoteSchema.create({ text, author_name, book_id });

    res.status(201).json({ message: "Quote added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await QuoteSchema.findById(id);
    if (!quote) {
      throw CustomErrorHandler.NotFound("Quote not found");
    }

    await QuoteSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "Quote deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllQuotes,
  getOneQuote,
  getQuotesByBook,
  addQuote,
  deleteQuote,
};
