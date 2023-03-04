const { isEmpty, get, some } = require("lodash");

const logger = require("../service/logger")("Buyer Service");

const { Catalogs, Orders } = require("../models");
const { getUniqueId } = require("./helper/authHelper");

const createCatalogService = async (req) => {
    const { apiCalledBy = "" } = req || {};
    const { products = [], catalogName = "" } = req.body || {};

    try {
        if (some(req.body, isEmpty)) {
            logger.info(`Received empty details for userId : ${apiCalledBy}`);
            return {
                status: "failure",
                message: "Catalog details cannot be empty, Please provide valid details",
            };
        }

        const catalogData = await Catalogs.findOne({ userId: apiCalledBy }, { catalogId: 1 });
        if (!isEmpty(catalogData)) {
            logger.info(`Catalog already available for userId : ${apiCalledBy}`);
            return {
                status: "failure",
                message: `Catalog already available for seller Id : ${apiCalledBy} ,catalogId : ${get(catalogData, "catalogId", "")}`,
            };
        }

        let productList = [];
        let invalidProducts = [];

        products.map((ele) => {
            const { name = "", price = 0 } = ele || {};
            if (isEmpty(name) || price <= 0) {
                invalidProducts.push({
                    name,
                    price,
                });
            } else
                productList.push({
                    productId: `PI-${getUniqueId()}`,
                    name,
                    price,
                });
        });

        if (productList.length > 0) {
            logger.info(`Creating catalog for userId : ${apiCalledBy} of product length : ${productList.length}`);
            let createdDocument = await Catalogs.create({
                catalogId: `CI-${getUniqueId()}`,
                catalogName,
                userId: apiCalledBy,
                products: productList,
            });

            return {
                status: "success",
                message: `Successfully added ${productList.length} products in catalog for seller Id : ${apiCalledBy}`,
                data: {
                    catalogId: get(createdDocument, "catalogId", ""),
                    addedProducts: get(createdDocument, "products", ""),
                    invalidProducts,
                },
            };
        } else {
            logger.info(`Invalid product details in catalog for userId : ${apiCalledBy} invalid product length : ${invalidProducts.length}`);
            return {
                status: "failure",
                message: `Failed to add products in catalog for seller Id : ${apiCalledBy}. Please provide valid name / price for the products`,
                data: {
                    invalidProducts,
                },
            };
        }
    } catch (error) {
        logger.error(`Error in create catalog service`, error.message, error);
        throw new Error(error);
    }
};

const listOrdersService = async (req) => {
    const { apiCalledBy } = req || {};
    try {
        let orderCount = await Orders.count({ sellerId: apiCalledBy });
        if (orderCount > 0) {
            let ordersList = await Orders.find({ sellerId: apiCalledBy }, { _id: 0, __v: 0 }).lean();
            return {
                status: "success",
                message: `Successfully listed all orders for seller Id : ${apiCalledBy}`,
                data: {
                    ordersList,
                },
            };
        } else {
            logger.info(`No orders found for sellerId : ${apiCalledBy}`);
            return {
                status: "failure",
                message: `No orders found for seller Id :${apiCalledBy}`,
            };
        }
    } catch (error) {
        logger.error(`Error in list orders service`, error.message, error);
        throw new Error(error);
    }
};

module.exports = {
    createCatalogService,
    listOrdersService,
};
