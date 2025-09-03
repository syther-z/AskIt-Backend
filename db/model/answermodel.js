import mongoose from "mongoose";
import crypto from "crypto"; // for generating random IDs

const answerSchema = new mongoose.Schema({
  aid: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(6).toString("hex") 
  },
  qid: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true
  },
  authorname: {
    type: String,
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
