//core modules
const path = require('path');


//External modules
const express = require('express');
const userRouter = express.Router();

//Local modules
const rootDir = require('../utils/pathUtil');
const { registeredHomes } = require('./hostRouter');

userRouter.get("/",(req,res,next) => {
  console.log(registeredHomes);
 res.render('home', {registeredHomes: registeredHomes, pageTitle:'airbnb Home', currentPage:'Home'});
}) 


module.exports = userRouter;