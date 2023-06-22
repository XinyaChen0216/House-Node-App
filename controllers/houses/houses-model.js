import mongoose from 'mongoose';
import housesSchema from './houses-schema.js'
const housesModel = mongoose.model('HousesModel', housesSchema);
export default housesModel;
