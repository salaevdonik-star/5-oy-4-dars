const { Schema, model } = require("mongoose");

const Citation = new Schema({
  body: {
    type: String,
    required: true,
    
  },
  book_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Book"
  }
}, {
  versionKey: false,
  timestamps: true
})

const CitationSchema = model("Citation", Citation)
module.exports = CitationSchema