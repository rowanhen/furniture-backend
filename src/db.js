const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "a",
//     host: "localhost",
//     port: 5432,
//     database: "newdatabase"
// });

const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const pool = new Pool(dbConfig);

module.exports = pool;