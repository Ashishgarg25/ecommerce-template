import mongoose from "mongoose";
const { Schema, model } = mongoose;

const variant_types = Object.freeze({
    Size: 'Size',
    Color: 'Color',
  });


  const variants_schema = new Schema({
    option: {
      type: Object.values(variant_types),
      required: true
    },
    sku: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
  })

const products = new Schema({
  shop: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  media: [
    {
      id: new mongoose.Types.ObjectId(),
      thumbnail: String
    }
  ],
  price: {
    type: Number,
    required: true
  },
  sale_price: {
    type: Number,
    required: true
  },
  tag: [
    {
      _id: new mongoose.Types.ObjectId(),
      name: String,
      slug: String
    }
  ],
  variants: [variants_schema],
  is_best_selling: {
    type: Boolean,
  },
  is_new_arrival: {
    type: Boolean
  },
  isActive: {
    type: Boolean,
    required: true
  }

}, { timestamps: true });

export default model("Products", products);
