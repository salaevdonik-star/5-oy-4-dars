const { Schema, model } = require("mongoose");

const Quote = new Schema(
  {
    text: {
      type: String,
      required: true,
      set: (val) => val.trim(),
      minLength: [5, "Iqtibos kamida 5 ta harf bolsin"],
      maxLength: [1000, "Iqtibos 1000 ta harfdan oshmasin"],
    },
    author_name: {
      type: String,
      required: true,
      set: (val) => val.trim(),
    },
    book_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const QuoteSchema = model("Quote", Quote);
module.exports = QuoteSchema;
