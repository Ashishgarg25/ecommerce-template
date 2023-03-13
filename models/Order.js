import mongoose from "mongoose";
const { Schema, model } = mongoose;

const order_status = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Order Placed'
    },
    color: {
        type: String,
        required: true,
        default: '#02B290'
    },
    serial: {
        type: Number,
        required: true,
        default: 1
    }
}, {timestamps: true})

const orders = new Schema(
  {
    customer: {
      id: Schema.Types.ObjectId,
      email: String,
      required: true,
    },
    product: [
      {
        _id: Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    shipping_fees: {
      type: Number,
      required: true,
    },
    discount: {
        type: Number
    },
    delivery_time: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: order_status,
    payment: {
      provider: String,
      payment_type: String,
      payment_id: String,
    },
    shipping_address: {
      street_address: String,
      country: String,
      city: String,
      state: String,
      zip: String,
    },
  },
  { timestamps: true }
);

export default model("Orders", orders);
