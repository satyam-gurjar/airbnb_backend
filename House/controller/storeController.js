const Home = require('../models/homes');
const User = require('../models/user');


exports.getIndex = async (req, res, next) => {
  try {
    const registeredHomes = await Home.find();
    let userFavourites = [];
    
    if (req.session.user && req.session.user.id) {
      const user = await User.findById(req.session.user.id);
      userFavourites = user.favourites.map(id => id.toString());
    }
    
    res.render('store/index', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'index',
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
      userFavourites: userFavourites,
    });
  } catch (err) {
    console.log("Error:", err);
    next(err);
  }
};


exports.getHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.find();
    let userFavourites = [];
    
    if (req.session.user && req.session.user.id) {
      const user = await User.findById(req.session.user.id);
      userFavourites = user.favourites.map(id => id.toString());
    }
    
    res.render('store/home', {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: 'Home',
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
      userFavourites: userFavourites,
    });
  } catch (err) {
    console.log("Error:", err);
    next(err);
  }
};

exports.getBookings = (req, res, next) => {
  res.render('store/bookings', {
    pageTitle: 'My Bookings',
    currentPage: 'bookings',
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavouriteList = async (req, res, next) => {
  if (!req.session.user || !req.session.user.id) {
    return res.redirect('/login');
  }
  
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId).populate('favourites');
    console.log("User", user);

    res.render('store/Favourite-list', {
      favouriteHomes: user.favourites || [],
      pageTitle: 'My Favourites',
      currentPage: 'Favourites',
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.log("Error fetching favourites:", err);
    next(err);
  }
}




exports.postAddToFavourite = async (req, res, next) => {
  if (!req.session.user || !req.session.user.id) {
    return res.redirect('/login');
  }
  
  try {
    const homeId = req.body.homeId;
    const userId = req.session.user.id;
    
    const user = await User.findById(userId);
    
    // Check if home is already in favourites
    if (user.favourites.includes(homeId)) {
      return res.redirect("/favourites");
    }
    
    // Add home to favourites
    user.favourites.push(homeId);
    await user.save();
    
    res.redirect("/favourites");
  } catch (err) {
    console.log("Error while marking favourite:", err);
    next(err);
  }
};


exports.postRemoveFromFavourite = async (req, res, next) => {
  if (!req.session.user || !req.session.user.id) {
    return res.redirect('/login');
  }
  
  try {
    const homeId = req.params.homeId;
    const userId = req.session.user.id;
    
    const user = await User.findById(userId);
    
    // Remove home from favourites array
    user.favourites = user.favourites.filter(id => id.toString() !== homeId);
    await user.save();
    
    res.redirect("/favourites");
  } catch (err) {
    console.log("Error removing from favourites:", err);
    next(err);
  }
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(home => {
    if (!home) {
      res.redirect("/homes")
    }
    else {
      res.render('store/home-detail', {
        home: home,
        pageTitle: "Home Detials",
        currentPage: "Home",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      })
    }
  });
};