const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        encryptedPassword: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["buyer", "seller"],
            required: true,
        },
    },
    {
        collection: "users",
        timestamps: true,
    }
);

module.exports = mongoose.model("Users", schema);
