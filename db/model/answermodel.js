import mongoose from "mongoose";
import crypto from "crypto"; // for generating random IDs

const answerSchema = new mongoose.Schema({
  aid: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(6).toString("hex") 
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default answerSchema;
