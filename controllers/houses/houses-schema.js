import mongoose from 'mongoose';
const schema = mongoose.Schema({
    house: String,
    likes: Number,
    liked: Boolean,
}, { collection: 'houses' });
export default schema;
