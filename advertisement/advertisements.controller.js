import * as advertisementsDao from "./advertisements-dao.js";

const findAdvertisements = async (req, res) => {
    const advertisements = await advertisementsDao.findAllAdvertisements();
    res.json(advertisements);
}

export default (app) => {
    app.get('/api/advertisements', findAdvertisements)
}
