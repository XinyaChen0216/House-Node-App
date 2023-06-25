import * as housesDao from "./houses-dao.js";
import mongoose from "mongoose";
const limitSize = 5;
import multer from "multer";
import * as fs from "fs";

const createHouse = async (req, res) => {
  const newHouse = req.body;
  const insertedHouse = await housesDao.createHouse(newHouse);
  let currImageString = [];
  insertedHouse.images.forEach((image) => {
    const curr = fs.readFileSync(`./public/images/${image}`);
    currImageString.push(new Buffer.from(curr).toString("base64"));
  });
  let currhouse = {
    ...insertedHouse._doc,
    imageStrings: currImageString,
  };
  res.json(currhouse);
};

const findHouse = async (req, res) => {
  let houses = await housesDao.findHouses().sort({ date_posted: -1 });
  let finalRes = [];
  houses.forEach((house) => {
    let currImageString = [];
    house.images.forEach((image) => {
      const curr = fs.readFileSync(`./public/images/${image}`);
      currImageString.push(new Buffer.from(curr).toString("base64"));
    });
    let currhouse = {
      ...house._doc,
      imageStrings: currImageString,
    };
    finalRes.push(currhouse);
  });
  console.log(finalRes);
  res.json(finalRes);
};

const findRecentHouse = async (req, res) => {
  const houses = await housesDao
    .findHouses()
    .sort({ date_posted: -1 }) // Sort in descending order of datePosted
    .limit(limitSize); // Limit the results to 5 houses
  res.json(houses);
};

const findHouseById = async (req, res) => {
  const id = req.params.hid;
  const house = await housesDao.findHouseById(id);
  res.json(house);
};

const updateHouse = async (req, res) => {
  const housedIdToUpdate = req.params.hid;
  const updates = req.body;
  const status = await housesDao.updateHouse(housedIdToUpdate, updates);
  res.json(status);
};

const deleteHouse = async (req, res) => {
  const housedIdToDelete = req.params.hid;
  const status = await housesDao.deleteHouse(housedIdToDelete);
  res.json(status);
};

const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).any("images");

const uploadImages = async (req, res) => {
  upload(req, res, (err) => {
    if (!err) res.sendStatus(200);
    else throw new Error(err);
  });
};

export default (app) => {
  app.post("/api/houses", createHouse);
  app.get("/api/houses", findHouse);
  app.get("/api/houses/:hid", findHouseById);
  app.put("/api/houses/:hid", updateHouse);
  app.delete("/api/houses/:hid", deleteHouse);
  app.get("/api/recenthouses/", findRecentHouse);
  app.post("/api/houses/images/upload", uploadImages);
};
