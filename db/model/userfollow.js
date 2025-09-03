import mongoose from "mongoose";
export const userFollowSchema = new mongoose.Schema({

    email:{
        type: String,
        unique: true,
        required: true
    },

    following: [{
        type: String,
    }],

    followers: [{
        type: String,
    }]
});
