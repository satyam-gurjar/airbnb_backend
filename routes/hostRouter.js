//core module
const path = require('path');
//External module
const express = require('express');
const hostRouter = express.Router();

//Local module
const rootDir =require('../utils/pathUtil')


hostRouter.get("/add-home",(req,res,next) => {
  res.render('addHome',{pageTitle:'Add Home to airbnb', currentPage:'AddHome'});
});

const registeredHomes = [];



hostRouter.post("/add-home",(req,res,next)=>{
  console.log('Home registration succesfull' ,req.body);
  registeredHomes.push(req.body)
  res.render('homeEdit',{pageTitle:'Home Edit Succesfully',currentPage:'AddHome'})
})

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
