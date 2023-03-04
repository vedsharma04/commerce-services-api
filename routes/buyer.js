const Router = require("express-promise-router");

const buyerController = require("../controllers/buyer");

module.exports = () => {
    const buyerRouter = Router({ mergeParams: true });
    buyerRouter.get("/list-of-sellers", buyerController.listSeller);
    buyerRouter.get("/seller-catalog/:userId", buyerController.listCatalog);
    buyerRouter.post("/create-order/:userId", buyerController.createOrder);
    return buyerRouter;
};
