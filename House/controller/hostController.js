const Home = require('../models/homes');


exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', {
    pageTitle: 'Add Home to airbnb',
    currentPage: 'AddHome',
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then(home => {
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render('host/edit-home', {
      home: home,
      pageTitle: 'Edit Your Home',
      currentPage: 'host-homes',
      editing: editing,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });

  });

}


exports.getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render('host/host-home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Host Homes List',
      currentPage: 'host-homes',
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    })
  });
};

exports.postAddHome = (req, res, next) => {

  const { house_name, price, location, Rating, PhotoUrl, description } = req.body;
  const home = new Home({ house_name, price, location, Rating, PhotoUrl, description });
  home.save().then(() => {
  });


  res.redirect('/host/host-home-list');
};


exports.postEditHome = (req, res, next) => {

  const { id, house_name, price, location, Rating, PhotoUrl, description } = req.body;
  Home.findById(id).then((home) => {
    home.house_name = house_name;
    home.price = price;
    home.location = location;
    home.Rating = Rating;
    home.PhotoUrl = PhotoUrl;
    home.description = description;
    home.save().then((result) => {
    }).catch(err => {
      console.log('Error while updating ', err);
    })
    res.redirect('/host/host-home-list');
  }).catch(err => {
    console.log('Error while findding home', err);
  })
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect('/host/host-home-list');
    })
    .catch(error => {
      console.log("error deleting home ", error);
    })

};



