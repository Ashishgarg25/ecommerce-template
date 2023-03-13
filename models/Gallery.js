import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gallerys = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    image_name: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Gallerys", gallerys);
