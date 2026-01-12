const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil')




module.exports = class Home {
  constructor(houseName, price, location, Rating, PhotoURL) {

    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.Rating = Rating;
    this.PhotoURL = PhotoURL;
  };


  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);

      const homeDataPath = path.join(rootDir, 'Data', 'homes.json');
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
        console.log("file error :", error);
      });

    })
  };



  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, 'Data', 'homes.json');

    fs.readFile(homeDataPath, (err, data) => {
      console.log('file read: ', err, data);
      callback(!err ? JSON.parse(data) : []);
    });

  }

};






