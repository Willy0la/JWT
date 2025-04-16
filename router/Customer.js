import getById from "../controller/getById.js";
import getAllUser from "../controller/getUser.js";
import register from "../controller/register.js";
import express from "express";
import update from "../controller/update.js";
import login from "../controller/login.js";
import authToken from "../MiddleWare/authToken.js";

const Router = express.Router();

Router.post("/register" ,register);
Router.post("/login", login);
Router.get("/all", getAllUser);
Router.get("/:id/getOne", getById);
Router.patch("/:id", update);

export default Router;
