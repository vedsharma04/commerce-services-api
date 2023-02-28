const config = require("./config/environment");
const express = require("express");

const logger = require("./service/logger")("index");
const { port } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    logger.info(`Server running at port ${port}`);
});
