import * as advertisementsDao from "./advertisements-dao.js";
import * as fs from "fs";

const findAdvertisements = async (req, res) => {
  const advertisements = await advertisementsDao.findAdvertisements();
  let finalRes = [];
  advertisements.forEach((ad) => {
    const curr = fs.readFileSync(`./public/images/${ad.images}`);
    let currImageString = new Buffer.from(curr).toString("base64");
    let currAds = {
      ...ad._doc,
      imageString: currImageString,
    };
    finalRes.push(currAds);
  });
  res.json(finalRes);
};

const findAdvertisementById = async (req, res) => {
  const id = req.params.aid;
  const advertisement = await advertisementsDao.findAdvertisementById(id);
  res.json(advertisement);
};

const createAdvertisement = async (req, res) => {
  const newAdvertisement = await advertisementsDao.createAdvertisement(
    req.body
  );
  const curr = fs.readFileSync(`./public/images/${newAdvertisement.images}`);
  let currImageString = new Buffer.from(curr).toString("base64");
  let currAds = {
    ...newAdvertisement._doc,
    imageString: currImageString,
  };
  res.json(currAds);
};

const deleteAdvertisement = async (req, res) => {
  const id = req.params.aid;
  const status = await advertisementsDao.deleteAdvertisement(id);
  res.json(status);
};

const updateAdvertisement = async (req, res) => {
  const advertisementIdToUpdate = req.params.aid;
  const updates = req.body;
  const status = await advertisementsDao.updateAdvertisement(
    advertisementIdToUpdate,
    updates
  );
  res.json(status);
};

export default (app) => {
  app.get("/api/advertisements", findAdvertisements);
  app.get("/api/advertisements/:aid", findAdvertisementById);
  app.post("/api/advertisements", createAdvertisement);
  app.put("/api/advertisements/:aid", updateAdvertisement);
  app.delete("/api/advertisements/:aid", deleteAdvertisement);
};
