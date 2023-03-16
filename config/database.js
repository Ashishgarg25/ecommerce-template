const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const express = require('express');
// const app = express();

dotenv.config();

const MongoURI = process.env.MONGO_URI;
// const port = process.env.PORT || 8000;

const ConnectToMongoDB = async() => {
  await mongoose
    .connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      // app.listen(port, () => console.log(`Server started on PORT ${port}`));
      console.log("MongoDB Connection Successfully!");
    })
    .catch((err) => console.log(`Error ${err}`));
};

module.exports = { ConnectToMongoDB };
