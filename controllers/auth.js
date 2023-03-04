const { registerService, loginService } = require("../service/authServices");
const logger = require("../service/logger")("authController");

const register = async (req, res) => {
    try {
        let response = await registerService(req);

        if (response.status == "success") {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        logger.error(`Error while calling register API`, error.message, error);
        return res.status(500).json({
            status: "failure",
            message: "Error while calling register API",
        });
    }
};

const login = async (req, res) => {
    try {
        let response = await loginService(req);

        if (response.status == "success") {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        logger.error(`Error while calling login API`, error.message, error);
        res.status(500).json({
            status: "failure",
            message: "Error while calling login API",
        });
    }
};

module.exports = {
    register,
    login,
};
