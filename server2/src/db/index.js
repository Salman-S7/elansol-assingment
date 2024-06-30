import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    dob: Date,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now }
})

export const User = mongoose.model('User',userSchema);