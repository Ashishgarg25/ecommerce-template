import mongoose from "mongoose";
const { Schema, model } = mongoose;

const shippingPolicys = new Schema({
    user_id: {
        type: String,
        required: true
    },
    formatted_text: {
        type: String,
    },
}, { timestamps: true });

export default model("ShippingPolicys", shippingPolicys);
