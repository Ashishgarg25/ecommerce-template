const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const addresses = new Schema({
  title: {
    type: String,
  },
  default: {
    type: Boolean,
  },
  address: {
    lat: Number,
    lng: Number,
    formatted_address: String
  }
})

const users = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  address: [addresses],
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Users", users);
