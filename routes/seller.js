const Router = require("express-promise-router");

const sellerController = require('../controllers/seller');

module.exports = () => {
    const sellerRouter = Router({ mergeParams: true });
    sellerRouter.post('/create-catalog', sellerController.createCatalog);
    sellerRouter.get('/orders',sellerController.listOrders);
    return sellerRouter;
};
