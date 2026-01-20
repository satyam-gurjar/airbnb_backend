
const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/Databaseutil');

module.exports = class Home {
  constructor(house_name, price, location, Rating, PhotoUrl, description, _id) {

    this.house_name = house_name;
    this.price = price;
    this.location = location;
    this.Rating = Rating;
    this.PhotoUrl = PhotoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  };


  save() {
    const db = getDb();
    if (this._id) {
      const updateFields = {
       house_name: this.house_name,
       price: this.price,
       location: this.location,
       Rating: this.Rating,
       PhotoUrl: this.PhotoUrl,
       description: this.description
      }
      return db.collection('homes').updateOne({ _id: new ObjectId(String(this._id)) },
        { $set:  updateFields});
    } else {
      return db.collection('homes').insertOne(this);
    }

  };



  static fetchAll() {
    const db = getDb();
    return db.collection('homes').find().toArray();


  }


  static findById(homeId) {
    const db = getDb();
    return db.collection('homes')
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static DeleteById(homeId, callback) {
    const db = getDb();
    return db.collection('homes')
      .deleteOne({ _id: new ObjectId(String(homeId)) });

  }

};





