const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Commerce Services APIs",
        description: "Documentation of Commerce services APIs",
        version: "1.0.0",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || "PORT"}/api/`,
            description: "local",
        },
    ],
    tags: [
        { name: "Auth", description: "APIs to handle user register and login" },
        { name: "Buyer", description: "APIs to perform operations from buyer's end" },
        { name: "Seller", description: "APIs to perform operations from seller's end" },
    ],
    components: {
        securitySchemes: {
            token: {
                type: "apiKey",
                name: "token",
                in: "header",
            },
        },
    },
    security: [
        {
            token: [],
        },
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
        "/auth/register": {
            post: {
                summary: "API to register user (seller/buyer)",
                tags: ["Auth"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/definitions/registerRequestBody",
                            },
                            example: {
                                firstName: "jessie",
                                lastName: "pinkman",
                                email: "jessie.pinkman@gmail.com",
                                password: "jessie@Cartel99",
                                type: "seller",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "User successfully register",
                    },
                    400: {
                        description: "Error while registering user",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/auth/login": {
            post: {
                summary: "API to login user (seller/buyer)",
                tags: ["Auth"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/definitions/loginRequestBody",
                            },
                            example: {
                                email: "jessie.pinkman@gmail.com",
                                password: "jessie@Cartel99",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "User successfull login",
                    },
                    400: {
                        description: "Error while user login",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/buyer/list-of-sellers": {
            get: {
                summary: "API to get list of sellers",
                description: "<h4>NOTE:</h4> Token required to call this API. Token can be retrieved from login API",
                tags: ["Buyer"],
                responses: {
                    200: {
                        description: "List of sellers fetched successfully",
                    },
                    400: {
                        description: "Error while fetching list of sellers",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/buyer/seller-catalog/{sellerId}": {
            get: {
                summary: "API to get seller catalog using sellerId",
                description: "<h4>NOTE:</h4> Token required to call this API. Token can be retrieved from login API",
                tags: ["Buyer"],
                parameters: [
                    {
                        name: "sellerId",
                        in: "path",
                        description: "sellerId",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    200: {
                        description: "Seller catalog fetched successfully",
                    },
                    400: {
                        description: "Error while fetching seller catalog",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/buyer/create-order/{sellerId}": {
            post: {
                summary: "API to get create order for a seller using sellerId",
                description: "<h4>NOTE:</h4> Token required to call this API. Token can be retrieved from login API",
                tags: ["Buyer"],
                parameters: [
                    {
                        name: "sellerId",
                        in: "path",
                        description: "sellerId",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/definitions/createOrderReqBody",
                            },
                            example: {
                                products: [
                                    {
                                        name: "Tea",
                                        price: 350,
                                        quantity: 4,
                                    },
                                    {
                                        name: "Coffee",
                                        price: 580,
                                        quantity: 7,
                                    },
                                ],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Order created successfully",
                    },
                    400: {
                        description: "Error while creating order",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/seller/create-catalog": {
            post: {
                summary: "API to create catalog for a seller",
                description: "<h4>NOTE:</h4> Token required to call this API. Token can be retrieved from login API",
                tags: ["Seller"],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/definitions/createCatalogRequestBody",
                            },
                            example: {
                                catalogName: "Instruments",
                                products: [
                                    {
                                        name: "Guitar",
                                        price: 7000,
                                    },
                                    {
                                        name: "Bass",
                                        price: 5000,
                                    },
                                    {
                                        name: "Ukelele",
                                        price: 3000,
                                    },
                                ],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Catalog created successfully",
                    },
                    400: {
                        description: "Error while creating catalog",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
        "/seller/orders": {
            get: {
                summary: "API to retrieve list of orders received by a seller",
                description: "<h4>NOTE:</h4> Token required to call this API. Token can be retrieved from login API",
                tags: ["Seller"],
                responses: {
                    200: {
                        description: "Orders fetched successfully",
                    },
                    400: {
                        description: "Error while fetching orders",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    500: {
                        description: "Internal Server Error",
                    },
                },
            },
        },
    },
    definitions: {
        registerRequestBody: {
            required: ["firstName", "lastName", "email", "password", "type"],
            properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                type: { type: "string", enum: ["buyer", "seller"] },
            },
        },
        loginRequestBody: {
            required: ["email", "password"],
            properties: {
                email: { type: "string" },
                password: { type: "string" },
            },
        },
        createOrderReqBody: {
            required: ["products"],
            properties: {
                products: {
                    type: "array",
                    items: {
                        type: "object",
                        required: ["name", "price", "quantity"],
                        properties: {
                            name: { type: "string" },
                            price: { type: "number" },
                            quantity: { type: "number" },
                        },
                    },
                },
            },
        },
        createCatalogRequestBody: {
            required: ["products", "catalogName"],
            properties: {
                catalogName: { type: "string" },
                products: {
                    type: "array",
                    items: {
                        type: "object",
                        required: ["name", "price"],
                        properties: {
                            name: { type: "string" },
                            price: { type: "number" },
                        },
                    },
                },
            },
        },
    },
};

module.exports = {
    swaggerDocument,
};
