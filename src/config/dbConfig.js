const mysql = require('mysql2');
require("dotenv").config();

module.exports = {
    development: {
        host: process.env.DEV_HOSTNAME,
        user: process.env.DEV_USERNAME,
        password: process.env.DEV_PASSWORD,
        database: process.env.DEV_DATABASE,
        port: process.env.DEV_PORT,
        dialet: 'mysql',
        // dialet: 'postgres',
        logging: false
    },
    production: {
        host: process.env.PROD_HOSTNAME,
        user: process.env.PROD_USERNAME,
        password: process.env.PROD_PASSWORD,
        database: process.env.PROD_DATABASE,
        port: process.env.PROD_PORT,
        dialet: 'mysql',
        // dialet: 'postgres',
        logging: false
    }
}

