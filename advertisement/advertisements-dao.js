import advertisementsModel from "./advertisements-model.js";

export const findAdvertisements = () => advertisementsModel.find();
export const findAdvertisementById = (aid) => advertisementsModel.findById(aid);
export const createAdvertisement = (advertisement) => advertisementsModel.create(advertisement);
export const updateAdvertisement = (aid, advertisement) => advertisementsModel.updateOne({ _id: aid }, { $set: advertisement })
export const deleteAdvertisement = (aid) => advertisementsModel.deleteOne({ _id: aid });
