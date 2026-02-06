import express from "express";
import UserController from "./user/users.controller.js";
import housesController from "./controllers/houses/houses-controller.js";
import advertisementsController from "./advertisement/advertisements.controller.js";
import cors from "cors";
import session from "express-session";
import AuthController from "./user/auth-controller.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
const PORT = process.env.PORT || 4000;
housesController(app);
UserController(app);
advertisementsController(app);
app.listen(process.env.PORT || 4000);

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("❌ Server failed to start:", err);
});

AuthController(app);

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/house-project"
const CONNECTION_STRING =
  "mongodb+srv://cs5610-house:83M34lsfOWJJqVfo@house.ve8boma.mongodb.net/House";

// console.log(CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING);