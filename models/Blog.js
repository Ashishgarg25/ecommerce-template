const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogs = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    shop: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: [
      {
        thumbnail: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blogs", blogs);
