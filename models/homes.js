const registeredHomes = [];

module.exports = class Home{
  constructor(houseName,price,location,Rating,PhotoURL){

    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.Rating = Rating;
    this.PhotoURL = PhotoURL;
  };
  

  save() {
  registeredHomes.push(this);
  };


  static fetchAll() {
    return registeredHomes;
  }

};






