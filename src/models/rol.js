const mongoose = require("mongoose");
const { Schema } = mongoose;

const RolSchema = new Schema(
    {
        name: { type: String, required: false },
        permissions: [],
        status: { type: Number, required: true }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("Rol", RolSchema);
