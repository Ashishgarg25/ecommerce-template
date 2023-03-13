const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MongoURI = process.env.MONGO_URI;

const ConnectToMongoDB = () => {
  mongoose
    .connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connection Successfully!");
    })
    .catch((err) => console.log(`Error ${err}`));
};

module.exports = { ConnectToMongoDB };
