const uuid = require("uuid");

const createUserId = (type) => {
    type = type.toLowerCase();
    let prefix = type == "buyer" ? "BY" : "SL";
    const uuidString = uuid.v4();
    const uuidParsed = uuid.parse(uuidString);
    let numberString = uuidParsed.toString().replace(/,/g, "");
    let suffix = BigInt(`0x${numberString}`).toString().slice(0, 10);
    return `${prefix}-${suffix}`;
};

module.exports = { createUserId };
