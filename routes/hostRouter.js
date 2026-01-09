//core module
const path = require('path');
//External module
const express = require('express');
const hostRouter = express.Router();

//Local module
const rootDir =require('../utils/pathUtil')


hostRouter.get("/add-home",(req,res,next) => {
  res.sendFile(path.join(rootDir, 'views','addHome.html'));
});

hostRouter.post("/add-home",(req,res,next)=>{
  console.log(req.body)
  res.sendFile(path.join(rootDir, 'views','homeEdit.html'))
})

module.exports = hostRouter;