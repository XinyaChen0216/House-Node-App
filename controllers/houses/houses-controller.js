// import posts from "./tuits.js";
// let tuits = posts;
import * as housesDao from './houses-dao.js'

const createHouse = async (req, res) => {
    const newHouse = req.body;
    const insertedHouse = await housesDao.createHouse(newHouse);
    res.json(insertedHouse);
}
const findHouse = async (req, res) => {
    console.log("hello")
    const houses = await housesDao.findHouses()
    console.log(houses)
    res.json(houses);
}

const findHouseById = async (req, res) => {
    const id = req.params.id;
    const house = await housesDao.findById(id);
    res.json(house);
}

const updateHouse = async (req, res) => {
    // const tuitdId = req.params.tid;
    // const updates = req.body;
    // const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)
    // tuits[tuitIndex] = { ...tuits[tuitIndex], ...updates };
    // res.sendStatus(200);
    const housedIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await housesDao
        .updateHouse(housedIdToUpdate, updates);
    res.json(status);
}
const deleteHouse = async (req, res) => {
    const housedIdToDelete = req.params.id;
    const status = await housesDao.deleteHouse(housedIdToDelete)
    res.json(status);
}
const getTop5RecentlyPostedHouses = async(req, res) => {
    const houses = await housesDao.findHouses()
        .sort({ datePosted: -1 }) // Sort in descending order of datePosted
        .limit(5); // Limit the results to 5 houses
    res.json(houses);
}

export default (app) => {
    app.post('/api/houses', createHouse);
    app.get('/api/houses', findHouse);
    app.get('/api/houses/:hid', findHouseById);
    app.put('/api/houses/:hid', updateHouse);
    app.delete('/api/houses/:hid', deleteHouse);
    app.get('api/houses/top5recentlypostedhouses', getTop5RecentlyPostedHouses);
}
