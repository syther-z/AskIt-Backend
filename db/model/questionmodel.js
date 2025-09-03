import mongoose from "mongoose";
import crypto from 'crypto'; 
export const questionSchema = new mongoose.Schema({

    qid: {
        type: String,
        unique: true,
        default: () => crypto.randomBytes(6).toString("hex") 
    },

    question: {
        type: String,
        required: true,
        trim: true
    },

    authorname: {
        type: String,
        required: true
    },

    // User who asked the question
    author: {
        type: String,
        ref: "User",
        required: true
    },

    // Optional description/details
    description: {
        type: String,
        default: ""
    },

    tags: [{
        type: String,
        index: true
    }],

    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'answer'
    }],

    upvotes: [{
        type: String
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },
});
