const mongoose = require("mongoose");
const { Schema } = mongoose;


const facebookAds = new Schema(
    {
        product: { type: String, ref: 'Product', required: true },
        amount: { type: Number, required: false },
        description: { type: String, required: false },
        date: { type: Number, required: false },
        status: { type: Number, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("FacebookAds", facebookAds);