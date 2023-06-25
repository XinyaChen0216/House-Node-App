import mongoose from "mongoose";
import advertisementsSchema from "./advertisements-schema.js";
const advertisementsModel = mongoose.model("Advertisements", advertisementsSchema);
export default advertisementsModel;
