import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: String,
    last_name: String,
    phone: String,
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    saved_houses: Array, "default": [],
    posted_houses: Array,
    following: Array,
    followers: Number
}, { collection: "users" });
export default usersSchema;
