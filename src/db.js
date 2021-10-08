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
    connectionString: process.env.DATABASE_URL || 'postgres://jdwszuzucsbgfn:ff0b512a01db69cf3606ad06908580caf27e37e3344cd5e560d8d0913d169866@ec2-176-34-116-203.eu-west-1.compute.amazonaws.com:5432/ddrf6vcs54373a',
    ssl: sslSetting
})

module.exports = pool;