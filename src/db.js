const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: "a",
//     host: "localhost",
//     port: 5432,
//     database: "newdatabase"
// });

const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.DATABASE_URL ? false : herokuSSLSetting

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'https://chair--app.herokuapp.com/',
    ssl: sslSetting
})

const pool = new Pool(dbConfig);

module.exports = pool;