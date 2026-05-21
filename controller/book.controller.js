const BookSchema = require("../schema/book.schema");

const getAllBooks = async (req, res) => {
  try {
    const books = await BookSchema.find().populate("author");

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, rating, reviewsCount, category, author } = req.body;

    await BookSchema.create({
      title,
      rating,
      reviewsCount,
      category,
      author,
    });

    res.status(201).json({
      message: "Added new book",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Noto'g'ri ID format",
      });
    }

    const foundedBook = await BookSchema.findById(id).populate("author");

    if (!foundedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(foundedBook);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Noto'g'ri ID format",
      });
    }

    const { title, rating, reviewsCount, category, author } = req.body;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await BookSchema.updateOne(
      { _id: id },
      {
        $set: {
          title,
          rating,
          reviewsCount,
          category,
          author,
        },
      },
    );

    res.status(200).json({
      message: "Updated book",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Noto'g'ri ID format",
      });
    }

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await BookSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted book",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
};
