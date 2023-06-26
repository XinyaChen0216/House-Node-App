import mongoose from "mongoose";
const advertisementsSchema = new mongoose.Schema({
    agent: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    image: String,
    overview: String,
}, { collection: "advertisement", strict: false });
export default advertisementsSchema;
