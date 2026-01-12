//External modules
const express = require('express');
const userRouter = express.Router();

//Local modules
const homesControler = require('../controller/homes')


userRouter.get("/",homesControler.getHomes);


module.exports = userRouter;