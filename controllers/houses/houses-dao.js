import housesModel from './houses-model.js';
export const findHouses = () => housesModel.find();
export const findRecentHouse = () => housesModel.find();
export const findHouseById = (hid) => housesModel.findById(hid);
export const createHouse = (house) => housesModel.create(house);
export const deleteHouse = (hid) => housesModel.deleteOne({ _id: hid });
export const updateHouse = (hid, house) => housesModel.updateOne({ _id: hid }, { $set: house })
// export const getTop5RecentlyPostedHouses = () => housesModel.find();

