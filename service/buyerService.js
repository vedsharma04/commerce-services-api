const { isEmpty, get } = require("lodash");
const moment = require("moment");

const logger = require("../service/logger")("Buyer Service");

const { Users, Catalogs, Orders } = require("../models");
const { getUniqueId } = require("./helper/authHelper");

const listSellerService = async (req) => {
    const { apiCalledBy = "" } = req || {};

    try {
        let dbQuery = { type: "seller" };
        let sellerCount = await Users.count(dbQuery);

        if (sellerCount > 0) {
            logger.info(`Total seller found : ${sellerCount}, quriedBy : ${apiCalledBy}`);
            let sellerList = await Users.find(dbQuery, { email: 1, firstName: 1, lastName: 1, userId: 1, createdAt: 1, _id: 0 }).lean();
            sellerList.map((ele) => {
                ele.createdAt = (moment(ele.createdAt).isValid() && moment(ele.createdAt).format("YYYY-MM-DD")) || "NA";
            });

            return {
                status: "success",
                message: "List of sellers fetched successfully",
                data: {
                    sellerCount,
                    sellerList,
                },
            };
        } else {
            logger.info(`No seller found, queriedBy : ${apiCalledBy}`);
            return {
                staatus: "failure",
                message: "No sellers found",
            };
        }
    } catch (error) {
        logger.error(`Error in list seller service`, error.message, error);
        throw new Error(error);
    }
};

const listCatalogService = async (req) => {
    const { apiCalledBy } = req || {};
    const { userId = "" } = req.params || {};

    try {
        if (isEmpty(userId)) {
            logger.info(`Received empty seller Id, queriedBy : ${apiCalledBy} `);
            return {
                status: "failure",
                message: "Seller id cannot be empty, Please provide valid seller id",
            };
        }

        let catalogData = await Catalogs.findOne({ userId }, { products: 1, catalogId: 1, _id: 0 }).lean();
        if (isEmpty(catalogData)) {
            logger.info(`Catalog data empty for sellerId ${userId}`);
            return {
                status: "failure",
                message: `Catalog not present for sellerId : ${userId}`,
            };
        }

        return {
            status: "success",
            message: `Successfully fetched catalog for sellerId : ${userId}`,
            data: {
                ...catalogData,
            },
        };
    } catch (error) {
        logger.error(`Error in list catalog service`, error.message, error);
        throw new Error(error);
    }
};

const createOrderService = async (req) => {
    const { apiCalledBy } = req || {};
    const { userId: sellerId = "" } = req.params || {};
    const { products = [] } = req.body || {};

    try {
        if (isEmpty(sellerId)) {
            logger.info(`Received empty sellerId, queriedBy : ${apiCalledBy}`);
            return {
                status: "failure",
                message: "Seller id cannot be empty, Please provide valid seller id",
            };
        } else if (isEmpty(products)) {
            logger.info(`Received empty list of products for sellerId : ${sellerId}`);
            return {
                status: "failure",
                message: "Products cannot be empty to create an order, Please provide product details",
            };
        }

        const { products: catalogProducts = [], catalogId = "" } = await Catalogs.findOne({ userId: sellerId }, { products: 1, catalogId: 1 }).lean();
        let totalPrice = 0;
        invalidProducts = [];
        productsInOrder = [];

        logger.info(`Received products count : ${products.length} and catalog products count : ${catalogProducts.length} for sellerId : ${sellerId}`);
        products.map((ele) => {
            const { name = "", price = 0, quantity = 0 } = ele;
            if (isEmpty(name) || price <= 0 || quantity <= 0) {
                invalidProducts.push({
                    name,
                    price,
                    quantity,
                });
            } else {
                catalogProducts.some((orig) => {
                    if (name === orig.name && price === orig.price) {
                        productsInOrder.push({
                            name,
                            price,
                            productId: orig.productId,
                            quantity,
                        });
                        totalPrice += Number(price * quantity);
                    }
                });
            }
        });

        if (totalPrice != 0) {
            logger.info(`Creating order for sellerId : ${sellerId} for price ${totalPrice} and product count : ${productsInOrder.length}`);
            let orderDocument = await Orders.create({
                orderId: `OID-${getUniqueId()}`,
                sellerId,
                buyerId: apiCalledBy,
                catalogId,
                totalPrice,
                products: productsInOrder,
                "statusHistory.createdAt": moment().utc().toDate(),
                "paymentHistory.pendingAt": moment().utc().toDate(),
            });
            logger.info(`Response from DB create -->`, JSON.stringify(orderDocument));

            return {
                status: "success",
                message: `Order successfully created for ${productsInOrder.length} with total price : ${totalPrice}`,
                data: {
                    orderId: get(orderDocument, "orderId", ""),
                    sellerId,
                    totalPrice,
                    products: productsInOrder,
                    catalogId,
                    status: get(orderDocument, "status", ""),
                    paymentStatus: get(orderDocument, "paymentStatus", ""),
                    invalidProducts,
                },
            };
        } else {
            logger.info(`Failed to create order for sellerId : ${sellerId} due to incorrect product details -->`, JSON.stringify(invalidProducts));
            return {
                status: "failure",
                message: "Failed to create order due to incorrect product datails",
                data: {
                    invalidProducts,
                },
            };
        }
    } catch (error) {
        logger.error(`Error in create order service`, error.message, error);
        throw new Error(error);
    }
};

module.exports = {
    listSellerService,
    listCatalogService,
    createOrderService,
};
