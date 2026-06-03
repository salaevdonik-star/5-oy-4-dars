const { Schema, model } = require("mongoose");

const User = new Schema({
  username: {
    type: String,
    required: [true, "Username shart"],
    unique: true,
    trim: true,
    minLength: [3, "Kamida 3 ta belgi"],
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, "Email shart"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Parol shart"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
}, {
  versionKey: false,
  timestamps: true,
});

const UserSchema = model("User", User);
module.exports = UserSchema;
