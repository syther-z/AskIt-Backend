import mongoose from "mongoose";

export const questionSchema = new mongoose.Schema({

    qid: {
        type: String,
        unique: true
    },

    question: {
        type: String,
        required: true,
        trim: true
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
        type: String,
        
    }],

    upvotes: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});
