//core module

//External module
const express = require('express');
const hostRouter = express.Router();

//Local module
const homesControler = require('../controller/hostController');


hostRouter.get("/add-home",homesControler.getAddHome);
hostRouter.post("/add-home",homesControler.postAddHome);
hostRouter.get("/host-home-list",homesControler.getHostHomes);
hostRouter.get("/edit-home/:homeId",homesControler.getEditHome);
hostRouter.post("/edit-home",homesControler.postEditHome);
hostRouter.post("/delete-home/:homeId",homesControler.postDeleteHome)
module.exports = hostRouter;

