const AuthorSchema = require("../schema/author.schema");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorSchema.find();

    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addAuthor = async (req, res) => {
  try {
    const { full_name, birth_year, death_year, bio, period, work, region } =
      req.body;

    await AuthorSchema.create({
      full_name,
      birth_year,
      death_year,
      bio,
      period,
      work,
      region,
    });

    res.status(201).json({
      message: "Added new author",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.status(200).json(foundedAuthor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, birth_year, death_year, bio, period, work, region } =
      req.body;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    await AuthorSchema.updateOne({_id: id}, {
      full_name,
      birth_year,
      death_year,
      bio,
      period,
      work,
      region,
    });

    res.status(404).json({
      message: "Updated author",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    await AuthorSchema.findByIdAndDelete({_id: id})

    res.status(404).json({
      message: "Deleted author",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
