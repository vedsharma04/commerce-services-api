const { some, isEmpty, get } = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const logger = require("./logger")("authServices");
const configs = require("../config/environment");
const { saltRounds, rsaPrivateKey } = configs.auth || {};

const { Users } = require("../models");
const { createUserId } = require("./helper/authHelper");

const registerService = async (req) => {
    try {
        let { firstName = "", lastName = "", email = "", password = "", type = "" } = req.body || {};

        if (some(req.body, isEmpty) || !["buyer", "seller"].includes(type.toLowerCase())) {
            return {
                status: "failure",
                message: "Invalid/Empty field values. Please pass appropriate values",
            };
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            return {
                status: "failure",
                message: "Invalid Password. Password should be minimum 8 characters long containing at least one lowercase, uppercase, digit and special character",
            };
        } else if (!/^[\w-\+.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return {
                status: "failure",
                message: "Invalid Email. Please enter email in correct format",
            };
        }
        const doc = await Users.findOne({ email });
        if (!isEmpty(doc)) {
            const encryptedPassword = await bcrypt.hash(password, Number(saltRounds));
            const createResponse = await Users.create({
                userId: createUserId(type),
                firstName,
                lastName,
                email,
                encryptedPassword,
                type: type.toLowerCase(),
            });
            logger.info(`User with userId: ${get(createResponse, "userId", "")} is created successfully`);

            return {
                status: "success",
                message: "Successfully created user",
                data: {
                    userId: get(createResponse, "userId", ""),
                    email,
                },
            };
        } else {
            return { status: "failed", message: `Failed to register with email ${email} as user already exist` };
        }
    } catch (error) {
        logger.error(`Error in register service`, error.message, error);
        throw new Error(error);
    }
};

const loginService = async (req) => {
    try {
        const { email = "", password = "" } = req.body || {};

        if (some(req.body, isEmpty)) {
            return {
                status: "failed",
                message: "Empty field values. Please pass appropriate values",
            };
        }

        const doc = await Users.findOne({ email });
        if (!isEmpty(doc)) {
            const match = await bcrypt.compare(password, doc.encryptedPassword);
            const { userId = "" } = doc || {};
            if (match) {
                const token = jwt.sign({ userId }, `${rsaPrivateKey}`.replace(/\\n/g, "\n"), { algorithm: "RS256" }, { expiresIn: "1d" });

                logger.info(`User with userId : ${userId} verified successfully`);
                return {
                    status: "success",
                    message: "User verification successfully",
                    data: {
                        token,
                    },
                };
            } else {
                logger.info(`Wrong passwoed entered for userId: ${userId}`);
                return {
                    status: "failed",
                    message: "Wrong password entered. Please enter correct value",
                };
            }
        } else {
            logger.info(`User not found with email : ${email}`);
            return {
                status: "failed",
                message: `User not found with the email ${email}. Please enter correct email or register`,
            };
        }
    } catch (error) {
        logger.error(`Error in register service`, error.message, error);
        throw new Error(error);
    }
};

module.exports = {
    registerService,
    loginService,
};
