const uuid = require("uuid");

const getUniqueId = () => {
    const uuidString = uuid.v4();
    const uuidParsed = uuid.parse(uuidString);
    let numberString = uuidParsed.toString().replace(/,/g, "");
    return BigInt(`0x${numberString}`).toString().slice(0, 10);
};

const createUserId = (type) => {
    type = type.toLowerCase();
    let prefix = type == "buyer" ? "BY" : "SL";
    let suffix = getUniqueId();
    return `${prefix}-${suffix}`;
};

module.exports = { createUserId, getUniqueId };
