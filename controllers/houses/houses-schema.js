import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    address: String,
    city: String,
    state: String,
    zipcode: String,
    bedrooms: Number,
    bathrooms: Number,
    size: Number,
    price: Number,
    type: String,
    year: Number,
    status: String,
    images: Array,
    date_posted: Date,
    overview: String,
    latitude: Number,
    longitude: Number,
    agent: String,
  },
  { collection: "house" }
);
export default schema;
