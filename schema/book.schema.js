const { Schema, model } = require("mongoose");

const Book = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      default: "Temuriylar davri",
      enum: {
        values: [
          "Temuriylar davri",
          "Jadid davri",
          "Sovet davri",
          "Mustaqillik davri",
        ],
        message: "{VALUE} bunday kategoriya ko'rsatilmagan",
      },
    },
    coverImage: {
      type: String,
      default: "",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const BookSchema = model("Book", Book);
module.exports = BookSchema;
