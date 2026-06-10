const { Schema, model } = require("mongoose");

const Author = new Schema({
  full_name: {
    type: String,
    required: [true, "Full name bolishi shart"],
    set: (val) => val.trim(),
    minLength: [3, "Kamida 3 ta harf bolsin"],
    maxLength: 50,
    match: /^[a-zA-Z\s]+$/, 
  },
  birth_year: {
    type: Number,
    required: true,
    min: 0,
    max: new Date().getFullYear() - 15
  },
  death_year: {
    type: Number,   
    default: null   
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
      message: "{VALUE} bunday qiymat ko'rsatilmagan"
    },
    default: "Temuriylar davri"  
  },
  work: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

const AuthorSchema = model("Author", Author)
module.exports = AuthorSchema