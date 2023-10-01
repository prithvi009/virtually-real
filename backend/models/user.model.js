import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    avatar: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vectors%2Fblank-profile-picture-vectors&psig=AOvVaw2ahyFNh8RdUj_qvxFg_HIq&ust=1696236910188000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJCUrIW91IEDFQAAAAAdAAAAABAJ",
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;


