import mongoose from "mongoose";
const { Schema, model } = mongoose;

const privacyPolicys = new Schema({
    user_id: {
        type: String,
        required: true
    },
    formatted_text: {
        type: String,
    },
}, { timestamps: true });

export default model("PrivacyPolicys", privacyPolicys);
