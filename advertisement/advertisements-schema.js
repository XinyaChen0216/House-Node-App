import mongoose from "mongoose";
const advertisementsSchema = new mongoose.Schema({
    title: String,
    description: String,
    house: {type: mongoose.Schema.Types.ObjectId, ref: 'house'},
    image: String,
}, { collection: "advertisement" });
export default advertisementsSchema;
