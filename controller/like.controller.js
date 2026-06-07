const CustomErrorHandler = require("../error/error");
const CitationSchema = require("../schema/citation.schema");
const LikeSchema = require("../schema/like.schema");

const toggleLike = async (req, res) => {
  try {
    const { citation_id } = req.params;
    const user_id = req.user.id;

    const foundedCitation = await CitationSchema.findById(citation_id);
    if (!foundedCitation) {
      throw CustomErrorHandler.NotFound("Citation not found");
    }

    const existingLike = await LikeSchema.findOne({ citation_id, user_id });

    if (existingLike) {
      await LikeSchema.findByIdAndDelete(existingLike._id);
      return res.status(200).json({
        message: "Like removed",
        liked: false,
      });
    }

    await LikeSchema.create({ citation_id, user_id });

    res.status(201).json({
      message: "Like added",
      liked: true,
    });
  } catch (error) {
    console.log("XATO:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLikes = async (req, res) => {
  try {
    const { citation_id } = req.params;

    const foundedCitation = await CitationSchema.findById(citation_id);
    if (!foundedCitation) {
      throw CustomErrorHandler.NotFound("Citation not found");
    }

    const likes = await LikeSchema.find({ citation_id });

    res.status(200).json({
      citation_id,
      likes_count: likes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  toggleLike,
  getLikes,
};
