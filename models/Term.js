const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const terms = new Schema({
    user_id: {
        type: String,
        required: true
    },
    formatted_text: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Terms", terms);
