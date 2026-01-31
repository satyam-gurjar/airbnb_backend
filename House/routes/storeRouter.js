//External modules
const express = require('express');
const storeRouter = express.Router();

//Local modules
const storeController = require('../controller/storeController')

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (!req.session.isLoggedIn || !req.session.user) {
    return res.redirect('/login');
  }
  next();
};

storeRouter.get("/", storeController.getIndex);

storeRouter.get("/homes", storeController.getHomes);

storeRouter.get("/bookings", requireAuth, storeController.getBookings);

storeRouter.get("/favourites", requireAuth, storeController.getFavouriteList);

storeRouter.get("/homes/:homeId", storeController.getHomeDetails);

storeRouter.post("/favourites", requireAuth, storeController.postAddToFavourite);

storeRouter.post("/favourites/delete/:homeId", requireAuth, storeController.postRemoveFromFavourite);

module.exports = storeRouter;