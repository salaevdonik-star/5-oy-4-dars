const CustomErrorHandler = require("../error/error");
const BookSchema = require("../schema/book.schema");

const getAllBooks = async (req, res) => {
  try {
    const books = await BookSchema.find().populate(
      "author_info",
      "-_id -createdAt -updatedAt",
    );

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const search = async (req, res) => {
  try {
    const { searchingvalue } = req.query;

    const books = await BookSchema.find({
      title: { $regex: searchingvalue, $options: "i" },
    }).populate("author_info", "-_id -createdAt -updatedAt");

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addBook = async (req, res) => {
  try {
    const {
      title,
      period,
      pages,
      published_year,
      genres,
      publisher,
      details,
      author_info,
    } = req.body;

    await BookSchema.create({
      title,
      period,
      pages,
      published_year,
      genres,
      publisher,
      details,
      author_info,
    });

    res.status(201).json({
      message: "Added new book",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id).populate(
      "author_info",
      "-_id -createdAt -updatedAt",
    );

    if (!foundedBook) {
      throw CustomErrorHandler.NotFound("Book not found");
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
    const {
      title,
      period,
      pages,
      published_year,
      genres,
      publisher,
      details,
      author_info,
    } = req.body;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorHandler.NotFound("Book not found");
    }

    await BookSchema.updateOne(
      { _id: id },
      {
        title,
        period,
        pages,
        published_year,
        genres,
        publisher,
        details,
        author_info,
      },
    );

    res.status(200).json({
      message: "Updated book",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedBook = await BookSchema.findById(id);

    if (!foundedBook) {
      throw CustomErrorHandler.NotFound("Book not found")
    }

    await BookSchema.findByIdAndDelete({ _id: id });

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
  search,
};
