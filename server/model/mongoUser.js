import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100,
    },
    age: Number,
    contact: String,
})

const User = mongoose.model('mongoUser', UserSchema)

export default User;