const mysql = require("mysql2");
// import mysql from "mysql2";
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

module.exports = { pool };
// export default pool;