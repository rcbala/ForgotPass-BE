
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        trim:true,
    },
    email: {
        type: String,
        require: true,
        unique:true,
        trim:true,
    },
    password: {
        type: String,
        require: true,
        trim:true,
    },
    
})

const User = mongoose.model("user", UserSchema)
export default User;