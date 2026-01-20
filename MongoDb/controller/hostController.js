const Home = require('../models/homes');


exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', {
    pageTitle: 'Add Home to airbnb',
    currentPage: 'AddHome',
    editing : false,
  });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("home not found");
      return res.redirect("/host/host-home-list");
    }
    res.render('host/edit-home', {
      home: home,
      pageTitle: 'Edit Your Home',
      currentPage: 'host-homes',
      editing: editing,
    });

  });

}


exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render('host/host-home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Host Homes List',
      currentPage: 'host-homes'
    })
});
};

exports.postAddHome = (req, res, next) => {

  const { house_name, price, location, Rating, PhotoUrl, description } = req.body;
  const home = new Home(house_name, price, location, Rating, PhotoUrl,description);
  home.save().then(() => {
    console.log('homes save succesfully');
  });


  res.redirect('/host/host-home-list');
};


exports.postEditHome = (req, res, next) => {

  const {id, house_name, price, location, Rating, PhotoUrl,description } = req.body;
  const home = new Home(house_name, price, location, Rating, PhotoUrl,description,id);
  
  home.save().then(result => {
    console.log('home updated', result);
  });
  res.redirect('/host/host-home-list');

};

exports.postDeleteHome = (req, res, next) => {
 const homeId = req.params.homeId;
 console.log('came to delete home id ',homeId);
 Home.DeleteById(homeId).then(() => {
  res.redirect('/host/host-home-list');
 }).catch(error =>{
  console.log("error deleting home ",error);
 })
  
};



