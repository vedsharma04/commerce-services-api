const config = require("./config/environment");
const express = require("express");
const mongoose = require("mongoose");

const { handleError } = require("./middlewares/errorMiddleware.js");
const logger = require("./service/logger")("index");
const apiRoutes = require("./routes/routes");

const { port, mongoDbUri } = config;

mongoose.connect(mongoDbUri);
const dbConnection = mongoose.connection;

dbConnection.on("error", (error) => {
    logger.info("Error while connecting to DB", error);
});

dbConnection.once("open", async () => {
    logger.info(`Connected to :`, mongoDbUri);
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/api", apiRoutes(app));
    app.use((req, res) => {
        res.status(404).json({ status: "failure", message: "Path not found, Please provide proper route" });
    });

    app.use(handleError);

    app.listen(port, () => {
        logger.info(`Server running at port ${port}`);
    });
});
