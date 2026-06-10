const { Schema, model, Types } = require("mongoose");

const Like = new Schema({
  citation_id: {
    type: Types.ObjectId,   
    required: true,
    ref: "Citation"
  },
  user_id: {
    type: Types.ObjectId,
    required: true,
    ref: "Auth"
  }
}, {
  versionKey: false,
  timestamps: true
})
const LikeSchema = model("Like", Like)
module.exports = LikeSchema