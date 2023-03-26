const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const role_types = Object.freeze({
  USER: "USER",
  ADMIN: "ADMIN",
});

const users = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: Object.values(role_types),
      required: "Role is required"
    },
    phone: {
      type: String,
    },
    address: [
      {
        title: {
          type: String,
        },
        default: {
          type: Boolean,
        },
        address: {
          lat: Number,
          lng: Number,
          formatted_address: String,
        },
      },
    ],
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", users);
