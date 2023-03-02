const config = require("./config/environment");
const express = require("express");
const mongoose = require("mongoose");

const logger = require("./service/logger")("index");
const { port } = config;

mongoose.connect(process.env.MONGO_DB_URI);

let dbConnection = mongoose.connection;

dbConnection.on("error", (error) => {
    logger.info("Error while connecting to DB", error);
});

dbConnection.once("open", async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use((err, req, res, next) => {
        logger.error(err.stack);
        res.status(500).send("<h2>Unable to connect to server<h2>");
    });

    app.listen(port, () => {
        logger.info(`Server running at port ${port}`);
    });
});
