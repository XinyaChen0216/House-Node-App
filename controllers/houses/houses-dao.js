import housesModel from './houses-model.js';
export const findHouses = () => housesModel.find();
export const createHouse = (house) => housesModel.create(house);
export const deleteHouse = (tid) => housesModel.deleteOne({ _id: tid });
export const updateHouse = (tid, house) => housesModel.updateOne({ _id: tid }, { $set: house })
