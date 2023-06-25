import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
    const register = async (req, res) => {
        // const username = req.body.username;
        // const user = usersDao.findUserByUsername(username);
        // if (user) {
        //     res.sendStatus(409);
        //     return;
        // }
        // usersDao.createUser(req.body);
        // req.session["currentUser"] = req.body;
        // res.json(req.body);
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(403);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        // const username = req.body.username;
        // const password = req.body.password;
        // const user = usersDao.findUserByCredentials(username, password);
        // if (user) {
        //     req.session["currentUser"] = user;
        //     res.json(user);
        // } else {
        //     res.sendStatus(404);
        // }
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                req.session["currentUser"] = user;
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    };

    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };

    const viewOtherProfile = async (req, res) => {
        const requestedUser = await usersDao.findUserByUsername(req.params.username);

        if (!requestedUser) {
            res.sendStatus(404);
            return;
        }
        //console.log(req.session['currentUser']);
        //console.log(requestedUser);

        res.json(requestedUser);
    };

    const viewOtherProfileById = async (req, res) => {
        const requestedUser = await usersDao.findUserById(req.params.id);

        if (!requestedUser) {
            res.sendStatus(404);
            return;
        }
        //console.log(req.session['currentUser']);
        //console.log(requestedUser);

        res.json(requestedUser);
    };

    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async (req, res) => {
        const user = await usersDao.updateUser(req.params.uid, req.body)
        req.session["currentUser"] = user
        res.json(user)
    };

    const viewTopAgents = async (req, res) => {
        //const allAgents = await usersDao.findAllAgents(req, res).sort({followers.length: -1}).limit(3);
        const allAgents = await usersDao.findAllAgents(req, res);
        allAgents.sort((a, b) => b.followers.length - a.followers.length); // Sort by followers array length in descending order
        const topAgents = allAgents.slice(0, 3);
        res.json(topAgents)
    };

    


    app.post("/api/register", register);
    app.post("/api/login", login);
    app.post("/api/profile", profile);
    app.get("/api/profile/:username", viewOtherProfile);
    app.get("/api/:id", viewOtherProfileById);
    app.post("/api/logout", logout);
    app.put("/api/:uid", update);
    app.get("/api/topagents", viewTopAgents);
    
};
export default AuthController;
