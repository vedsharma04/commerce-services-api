const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        sellerId: {
            type: String,
            required: true,
        },
        buyerId: {
            type: String,
            required: true,
        },
        catalogId: {
            type: String,
            required: true,
        },
        totalPrice: Number,
        status: {
            type: String,
            enum: [
                "created",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
                "returned",
                "refunded",
                "partially_shipped",
                "partially_delivered",
            ],
            default: "created",
        },
        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "success",
                "failure",
                "cancelled",
                "reconciled",
                "refunded",
            ],
            default: "pending",
        },
        products: [
            {
                _id: false,
                productId: String,
                name: String,
                price: Number,
                quantity: Number,
            },
        ],
        statusHistory: {},
        paymentHistory: {},
    },
    {
        collection: "orders",
        timestamps: true,
    }
);

module.exports = mongoose.model("Orders", schema);
