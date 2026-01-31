const mongoose = require('mongoose');


const homeSchema = new mongoose.Schema({
  house_name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  Rating: {
    type: Number,
    require: true
  },
  PhotoUrl: {
    type: String,
    require: true
  },
  description: String,
});

// homeSchema.pre('findOneAndDelete', async function (next) {
//   const homeId = this.getQuery()._id;
//   await favourite.deleteMany({
//     houseId: homeId
//   })
//   next();
// })

module.exports = mongoose.model('Home', homeSchema);
