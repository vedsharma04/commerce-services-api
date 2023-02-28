require('dotenv').config();

module.exports ={
    port: process.env.PORT || 'PORT',
    mongoDbUri : process.env.MONGO_DB_URI || 'MONGO_DB_URI'
}