import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username : {
        type: String,
        required: [true, "Username already taken"],
        unique: true
    }, 
    email: {
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const User = mongoose.model("user", userSchema);

export default User;