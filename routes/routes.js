const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");
const { swaggerDocument } = require("../swagger/docs");

const { authenticate } = require("../middlewares/authenticate");

const authRoutes = require("./auth");
const buyerRoutes = require("./buyer");
const sellerRoutes = require("./seller");

const apiRouter = Router();

module.exports = () => {
    return apiRouter
    .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use("/auth", authRoutes()).use(authenticate)
    .use("/buyer", buyerRoutes())
    .use("/seller", sellerRoutes());
};
