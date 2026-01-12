const Home = require('../models/homes');


exports.getAddHome = (req, res, next) => {
  res.render('addHome', { 
    pageTitle: 'Add Home to airbnb', 
    currentPage: 'AddHome' 
  });
}


exports.postAddHome = (req, res, next) => {
  console.log('Home registration succesfull', req.body);

  const {houseName,price,location,Rating,PhotoURL} = req.body;
  const home = new Home(houseName,price,location,Rating,PhotoURL);
  home.save();


  res.render('homeEdit', {
     pageTitle: 'Home Edit Succesfully', 
     currentPage: 'AddHome' 
    });
};


exports.getHomes = (req,res,next) => {
  const registeredHomes = Home.fetchAll();
  console.log(registeredHomes);

 res.render('home', {
    registeredHomes: registeredHomes, 
    pageTitle:'airbnb Home', 
    currentPage:'Home'
  });
}


