const { Router } = require("express");

const { authenticate } = require("../middlewares/authenticate");

const authRoutes = require("./auth");
const buyerRoutes = require("./buyer");
const sellerRoutes = require("./seller");

const apiRouter = Router();

module.exports = () => {
    return apiRouter
    .use("/auth", authRoutes())
    .use(authenticate)
    .use("/buyer", buyerRoutes())
    .use("/seller", sellerRoutes());
};
