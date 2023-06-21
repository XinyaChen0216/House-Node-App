// import posts from "./tuits.js";
// let tuits = posts;
import * as housesDao from './houses-dao.js'
import mongoose from 'mongoose'
const limitSize = 5;

const createHouse = async (req, res) => {
    const newHouse = req.body;
    const insertedHouse = await housesDao.createHouse(newHouse);
    res.json(insertedHouse);
}
const findHouse = async (req, res) => {
    const houses = await housesDao.findHouses()
    res.json(houses);
}

const findRecentHouse = async (req, res) => {
    const houses = await housesDao.findHouses()
        .sort({ date_posted: -1 }) // Sort in descending order of datePosted
        .limit(limitSize); // Limit the results to 5 houses
    res.json(houses);
}


const findHouseById = async (req, res) => {
    const id = req.params.hid;
    const house = await housesDao.findHouseById(id);
    res.json(house);
}

const updateHouse = async (req, res) => {
    const housedIdToUpdate = req.params.hid;
    const updates = req.body;
    const status = await housesDao
        .updateHouse(housedIdToUpdate, updates);
    res.json(status);
}

const deleteHouse = async (req, res) => {
    const housedIdToDelete = req.params.hid;
    const status = await housesDao.deleteHouse(housedIdToDelete)
    res.json(status);
}

// const getTop5RecentlyPostedHouses = async (req, res) => {
//     console.log("Hello")
//     const houses = await housesDao.findHouses()
//         .sort({ date_posted: -1 }) // Sort in descending order of datePosted
//         .limit(5); // Limit the results to 5 houses
//     res.json(houses);
// }

export default (app) => {
    app.post('/api/houses', createHouse);
    app.get('/api/houses', findHouse);
    app.get('/api/houses/:hid', findHouseById);
    app.put('/api/houses/:hid', updateHouse);
    app.delete('/api/houses/:hid', deleteHouse);
    app.get('/api/recenthouses/', findRecentHouse);
}
