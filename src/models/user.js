const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: { type: String, required: false },
        userName: { type: String, required: true, unique: true },
        pass: { type: String },
        phone: { type: String, required: false },
        /*  role: { type: mongoose.Types.ObjectId, ref: 'Rol' }, */
        role: { type: String, required: true },
        status: { type: Number, required: true }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);
