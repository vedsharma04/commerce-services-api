const logger = require("../service/logger")("Seller Controller");

const { createCatalogService, listOrdersService } = require("../service/sellerService");

const createCatalog = async (req, res) => {
    try {
        let response = await createCatalogService(req);

        if (response.status == "success") {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        logger.error(`Error while calling create catalog API`, error.message, error);
        return res.status(500).json({
            status: "failure",
            message: "Error while calling create catalog API",
        });
    }
};

const listOrders = async (req, res) => {
    try {
        let response = await listOrdersService(req);

        if (response.status == "success") {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        logger.error(`Error while calling list orders API`, error.message, error);
        return res.status(500).json({
            status: "failure",
            message: "Error while calling list orders API",
        });
    }
};

module.exports = {
    createCatalog,
    listOrders,
};
