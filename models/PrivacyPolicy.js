const mongoose = require('mongoose')
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

module.exports = mongoose.model("PrivacyPolicys", privacyPolicys);
