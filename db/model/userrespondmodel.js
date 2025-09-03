import mongoose from "mongoose";
import crypto from 'crypto'; 
import { type } from "os";
export const userRespondSchema = new mongoose.Schema({

    email:{
        type: String,
        unique: true,
        required: true
    },

    upvotes: [{
        type: String,
    }],

    replies: [{
        type: String
    }],

    bookmarks: [{
        type: String
    }]
});
