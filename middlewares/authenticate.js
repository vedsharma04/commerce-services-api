const { get, isEmpty } = require("lodash");
const jwt = require("jsonwebtoken");

const logger = require("../service/logger")("authenticate");
const configs = require("../config/environment");
const { rsaPublicKey } = configs.auth || {};

const authenticate = (req, res, next) => {
    const { token = "" } = req.headers || {};

    try {
        if (isEmpty(token)) {
            throw new Error("EmptyToken");
        }

        let result = jwt.verify(token, `${rsaPublicKey}`.replace(/\\n/g, "\n"), { algorithms: ["RS256"] });
        let userId = get(result, "userId", "");
        let userType = userId.substring(0, 2) == "BY" ? "buyer" : "seller";

        if (req.path.includes(userType)) {
            req.apiCalledBy = userId;
            next();
        } else {
            return res.status(401).json({ status: "failed", message: `Unauthorized. Cannot access route for userId: ${userId}` });
        }
    } catch (error) {
        logger.info(`Error verifying token`, error);
        error.statusCode = 401;
        next(error);
    }
};

module.exports = {
    authenticate,
};
