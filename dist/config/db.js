"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const env_1 = require("./env");
const pool = new pg_1.Pool({
    host: env_1.config.db.host,
    port: env_1.config.db.port,
    database: env_1.config.db.database,
    user: env_1.config.db.user,
    password: env_1.config.db.password,
});
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
exports.db = {
    query: (text, params) => pool.query(text, params),
};
