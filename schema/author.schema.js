const { Schema, model } = require("mongoose");

const Author = new Schema({
  full_name: {
    type: String,
    required: true
  },
  birth_year: {
    type: Date,
    required: true
  },
  death_year: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true,
    enum: {
      values: ["Temuriylar davri", "Jadid davri", "Sovet davri", "Mustaqillik davri"],
      default: "Temuriylar davri",
      message: "{Values} bunday qiymat ko'rsatilmagan"
    }
  },
  work: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

const AuthorSchema = model("Author", Author)
module.exports = AuthorSchema