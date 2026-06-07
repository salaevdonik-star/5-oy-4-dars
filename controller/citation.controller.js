const CustomErrorHandler = require("../error/error");
const CitationSchema = require("../schema/citation.schema");

const addCitation = async (req, res) => {
  try {
    const { body, book_id } = req.body;

    await CitationSchema.create({
      body,
      book_id,
    });

    res.status(201).json({
      message: "Added new citation",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCitation = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, book_id } = req.body;

    const foundedCitation = await CitationSchema.findById(id);

    if (!foundedCitation) {
      throw CustomErrorHandler.NotFound("Citation not found");
    }

    await CitationSchema.updateOne(
      { _id: id },
      {
        title,
        book_id,
      },
    );

    res.status(200).json({
      message: "Updated citation",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletCitation = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedCitation = await CitationSchema.findById(id);

    if (!foundedCitation) {
      throw CustomErrorHandler.NotFound("Citation not found");
    }

    await CitationSchema.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: "Deleted citation",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateCitation,
  deletCitation,
  addCitation
};
