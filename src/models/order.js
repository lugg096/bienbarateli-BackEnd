const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        dateConfirm: { type: Number, required: false },
        name: { type: String, required: false },
        address: { type: String, required: false },
        reference: { type: String, required: false },
        district: { type: String, required: false },
        phone: { type: String, required: false },
        numShopify: { type: String, required: false },

        products: { type: Array, required: false },
        quantity: { type: Number, required: false },
        amount: { type: Number, required: false },

        payMode: { type: String, required: false },
        dateDelivery: { type: Object, required: false },
        time_initial: { type: String, required: false },
        time_end: { type: String, required: false },
        obs: { type: String, required: false },
        labels: { type: Array, required: false },
        status: { type: Number, required: true}
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);
