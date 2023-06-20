// import posts from "./tuits.js";
// let tuits = posts;
import * as housesDao from './houses-dao.js'

let newHouseTemplate = {
    topic: "NASA",
    username: "Nasa",
    handle: "@nasa",
    time: "0h",
    image: "nasa.png",
    title: "NASA",
    house: "",
    dislike: 0,
    replies: 0,
    retuits: 0,
};

const createHouse = async (req, res) => {
    const newHouse = req.body;
    newHouse.likes = 0;
    newHouse.liked = false;
    const insertedHouse = await housesDao.createHouse(newHouse);
    res.json(insertedHouse);
}
const findHouse = async (req, res) => {
    const houses = await housesDao.findHouses()
    res.json(houses);
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

export default (app) => {
    app.post('/api/houses', createHouse);
    app.get('/api/houses', findHouse);
    app.put('/api/houses/:tid', updateHouse);
    app.delete('/api/houses/:tid', deleteHouse);
}
