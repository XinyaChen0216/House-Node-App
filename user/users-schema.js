import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    phone: Number,
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true }
}, { collection: "users" });
export default usersSchema;
