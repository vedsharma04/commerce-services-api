const Router = require("express-promise-router");

const authController = require("../controllers/auth");

module.exports = () => {
    const authRouter = Router({ mergeParams: true });
    authRouter.post("/register", authController.register);
    authRouter.post("/login", authController.login);
    return authRouter;
};
