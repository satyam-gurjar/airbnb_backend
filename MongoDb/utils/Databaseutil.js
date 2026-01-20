const { MongoClient } = require("mongodb");

const MONGO_URL = "mongodb+srv://root:root@airbnb1.2hpergh.mongodb.net/airbnb?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then(client => {
      console.log("MongoDB connected successfully");
      _db = client.db(); // uses DB from URL
      callback();
    })
    .catch(err => {
      console.error("Mongo connection failed", err);
      process.exit(1);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("mongo not connected");
  }
  return _db;
};

module.exports = {
  mongoConnect,
  getDb
};
