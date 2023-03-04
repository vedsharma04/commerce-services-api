const logger = require("../service/logger")("buyerController");

const { listSellerService, listCatalogService, createOrderService } = require("../service/buyerService");

const listSeller = async (req, res) => {
    try {
        let response = await listSellerService(req);

        if (response.status == "success") {
            logger.info(`listSeller API success`);
            return res.status(200).json(response);
        } else {
            logger.info(`listSeller API failure`);
            return res.status(400).json(response);
        }
    } catch (error) {
        logger.error(`Error while calling list seller API`, error.message, error);
        return res.status(400).json({
            status: "failure",
            message: "Error while calling list seller API",
        });
    }
};

const listCatalog = async (req, res) => {
    try {
        let response = await listCatalogService(req);

        if (response.status == "success") {
            logger.info(`listCatalog API success`);
            return res.status(200).json(response);
        } else {
            logger.info(`listCatalog API failure`);
            return res.status(400).json(response);
        }
    } catch (error) {
        logger.error(`Error while calling list catalog API`, error.message, error);
        return res.status(400).json({
            status: "failure",
            message: "Error while calling list catalog API",
        });
    }
};

const createOrder = async (req, res) => {
    try {
        let response = await createOrderService(req);

        if (response.status == "success") {
            logger.info(`createOrder API success`);
            return res.status(200).json(response);
        } else {
            logger.info(`createOrder API failure`);
            return res.status(400).json(response);
        }
    } catch (error) {
        logger.error(`Error while calling create order API`, error.message, error);
        return res.status(400).json({
            status: "failure",
            message: "Error while calling create order API",
        });
    }
};

module.exports = {
    listSeller,
    listCatalog,
    createOrder,
};
