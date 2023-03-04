const { toNumber } = require("lodash");
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        collection: "products",
        timestamps: true,
    }
);

module.exports = mongoose.model("Products", schema);
