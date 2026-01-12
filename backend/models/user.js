import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    avatar: {
        type: String
    },

})
export const User = mongoose.model("User", userSchema)