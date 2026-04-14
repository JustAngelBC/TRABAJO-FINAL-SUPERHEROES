"use strict";
require('dotenv').config();
module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'superheroes',
        },
        migrations: {
            directory: './src/db/migrations',
        },
        seeds: {
            directory: './src/db/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './dist/db/migrations',
        },
        seeds: {
            directory: './dist/db/seeds',
        },
        pool: {
            min: 2,
            max: 10,
        },
    },
};
//# sourceMappingURL=knexfile.js.map