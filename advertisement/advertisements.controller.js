import * as advertisementsDao from "./advertisements-dao.js";

const findAdvertisements = async (req, res) => {
    const advertisements = await advertisementsDao.findAdvertisements();
    res.json(advertisements);
}

const findAdvertisementById = async (req, res) => {
    const id = req.params.aid;
    const advertisement = await advertisementsDao.findAdvertisementById(id);
    res.json(advertisement);
  };

const createAdvertisement = async (req, res) => {
    const newAdvertisement = await advertisementsDao.createAdvertisement(req.body);
    res.json(newAdvertisement);
};

const deleteAdvertisement = async (req, res) => {
    const id = req.params.aid;
    const status = await advertisementsDao.deleteAdvertisement(id);
    res.json(status);
}

const updateAdvertisement = async (req, res) => {
    // console.log("hello");
    const advertisementIdToUpdate = req.params.aid;
    console.log(advertisementIdToUpdate);
    const updates = req.body;
    console.log(updates);
    const status = await advertisementsDao.updateAdvertisement(advertisementIdToUpdate, updates);
    res.json(status);
}

export default (app) => {
    app.get('/api/advertisements', findAdvertisements)
    app.get('/api/advertisements/:aid', findAdvertisementById)
    app.post('/api/advertisements', createAdvertisement)
    app.put('/api/advertisements/:aid', updateAdvertisement)
    app.delete('/api/advertisements/:aid', deleteAdvertisement)
}
