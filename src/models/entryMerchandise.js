const mongoose = require("mongoose");
const { Schema } = mongoose;


const entryMerchandiseSchema = new Schema(
    {
        product: { type: String, ref: 'Product', required: true },
        description: { type: String, required: false },
        typeProduct: { type: String, required: true },
        typeName: { type: String, required: false },
        quantity: { type: Number, required: false },
        amount: { type: Number, required: false },
        supplier: { type: String, required: false },
        date: { type: Number, required: false },
        status: { type: Number, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("EntryMerchandise", entryMerchandiseSchema);