import mongoose from "mongoose";
const advertisementsSchema = new mongoose.Schema({
    agent: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    first_name: String,
    last_name:String,
    image: String,
    phone: String,
    email: String,
}, { collection: "advertisement", strict: false });
export default advertisementsSchema;
