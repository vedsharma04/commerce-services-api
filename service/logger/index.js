const bunyan = require('bunyan');

module.exports = (loggerName)=>{
    const name = loggerName || "default logger";

    return bunyan.createLogger({
        name,
        env: process.env.NODE_ENV,
        serializers: bunyan.stdSerializers,
        src: true
    });
}