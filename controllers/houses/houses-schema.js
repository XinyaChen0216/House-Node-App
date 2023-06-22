import mongoose from 'mongoose';
const schema = mongoose.Schema({
    address: String,
    city: String,
    state: String,
    zipcode: String,
    bedrooms: String,
    bathrooms: String,
    size: String,
    price: String,
    type: String,
    year: String,
    status: String,
    images: Array,
    date_posted: Date,
    overview: String,
    latitude: String,
    longitude: String,
}, { collection: 'house' });
export default schema;
