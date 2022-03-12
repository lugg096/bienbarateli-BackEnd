const mongoose = require("mongoose");
const { Schema } = mongoose;

var typeProduct = new Schema({
    name: String,
    code: String
});

const productSchema = new Schema(
    {
        name: { type: String, required: false },
        description: { type: String, required: false },
        typeProduct: [typeProduct],
        urlImg: { type: String, required: false },
        status: { type: Number, required: true }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
