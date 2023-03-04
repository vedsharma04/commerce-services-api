require('dotenv').config();

module.exports ={
    port: process.env.PORT || 'PORT',
    mongoDbUri : process.env.MONGO_DB_URI || 'MONGO_DB_URI',
    auth:{
        saltRounds: process.env.SALT_ROUNDS || 'SALT_ROUNDS',
        rsaPrivateKey: process.env.RSA_PRIVATE_KEY || 'RSA_PRIVATE_KEY',
        rsaPublicKey: process.env.RSA_PUBLIC_KEY || 'RSA_PUBLIC_KEY',
        tokenExpiry: process.env.JWT_TOKEN_EXPIRY || 'JWT_TOKEN_EXPIRY'
    }
}