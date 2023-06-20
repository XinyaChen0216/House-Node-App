import express from 'express';
import UserController from './user/users.controller.js';
import housesController from './controllers/houses/houses-controller.js';
import cors from 'cors'
import session from "express-session";
import AuthController from './user/auth-controller.js';
import mongoose from 'mongoose';

const app = express()
app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
})
)
app.use(express.json());
const port = process.env.PORT || 4000;
housesController(app);
UserController(app)
app.listen(process.env.PORT || 4000);
AuthController(app);

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/house"

mongoose.connect(CONNECTION_STRING);


