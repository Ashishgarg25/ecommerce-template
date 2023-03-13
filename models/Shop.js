import mongoose from "mongoose";
const { Schema, model } = mongoose;

const shops = new Schema(
  {
    owner_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    owner_name: {
      type: String,
      required: true,
    },
    shop_name: {
      type: String,
      required: true,
    },
    shop_slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    cover_image: {
        type: String,
    },
    logo: {
        type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    address: {
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

export default model("Shops", shops);
