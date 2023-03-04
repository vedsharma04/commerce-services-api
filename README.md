
# commerce-services-api

API's for commerce services built on NodeJs

## Overview
The server is built on nodeJS with expressJS framework, all the APIs can be accessed via swagger UI

## Accessing the Swagger UI (API Documentation)

Swagger Ui can be accessed after running server in local by --> (http://localhost:9050/api/docs)

## Run Locally

Clone the project

```bash
  git clone https://github.com/vedsharma04/commerce-services-api
```

Go to the project directory

```bash
  cd commerce-services-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

NOTE : `.env` file is required to to run locally


## List of APIs

The server supports following APIs

### APIs for authentication

#### Register
POST `/api/auth/register`

#### Login
POST `/api/auth/login`

### APIs for buyers

#### List of Sellers
GET `/api/buyer/list-of-sellers`

#### Seller Catalog
GET `/api/buyer/seller-catalog/:seller_id`

#### Create Order
POST `/api/buyer/create-order/:seller_id`

### APIs for sellers

#### Create Catalog
POST `/api/seller/create-catalog`

#### Orders
GET `/api/seller/orders`
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV = development` 

`PORT = 9050` 

`MONGO_DB_URI` - DB URI for connection

`SALT_ROUNDS = 10` - could be changed according to preference 

`RSA_PRIVATE_KEY` - can be generated  via [file-path](https://github.com/vedsharma04/commerce-services-api/blob/development/extras/generateRsaKeys.js)

`RSA_PUBLIC_KEY` - can be generated via [file-path](https://github.com/vedsharma04/commerce-services-api/blob/development/extras/generateRsaKeys.js)

`JWT_TOKEN_EXPIRY = 1d` - expiry time for jwt token, can be configured


## Authors

- [@vedsharma04](https://github.com/vedsharma04)

