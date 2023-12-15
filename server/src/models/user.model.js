import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: {
        type: String
    },

    user_password: {
        type: String
    },

    user_type: {
        type: String
    },

}, {timestamps: true});

const User = mongoose.model("user", userSchema);

export default User;