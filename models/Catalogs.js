const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        catalogId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: String,
        products: [
            {
                _id: false,
                productId: String,
                name: String,
                price: Number,
            },
        ],
    },
    {
        collection: "catalogs",
        timestamps: true,
    }
);

module.exports = mongoose.model("Catalogs", schema);
