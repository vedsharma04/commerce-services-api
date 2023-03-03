const { get } = require("lodash");

const logger = require("../service/logger")("errorMiddleware");

const handleError = (err, req, res, next) => {
    logger.error(`Inside Error middleware`, err.message, err.statusCode, err.name);

    let errMsg = get(err, "message", "");
    let errName = get(err, "name", "");

    let responseCode = get(err, "statusCode", 500);
    let response = {
        status: "failure",
        message: "Unable to connect to server",
    };

    if ("TokenExpiredError" === errName || "jwt expired" === errMsg) {
        response.message = "Your Token for accessing the API's is Expired.Please login again";
    } else if ("JsonWebTokenError" === errName || "jwt malformed" === errMsg) {
        response.message = "Your Token for accessing the API's is Invalid. Please provide correct token or login again";
    } else if ("EmptyToken" === errMsg) {
        response.message = "Unauthorized. Please provide token in the request";
    }

    res.status(responseCode).json(response);
};

module.exports = {
    handleError,
};
