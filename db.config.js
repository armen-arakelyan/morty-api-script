// dbConfig.js
const fs = require("fs");
const os = require("os");

const dbConfig = {
    connectionString: `postgres://candidate:${process.env.DB_PASSWORD}@rc1b-r21uoagjy1t7k77h.mdb.yandexcloud.net:6432/db1`,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(`${os.homedir()}/.postgresql/root.crt`).toString(),
    },
};

module.exports = dbConfig;
