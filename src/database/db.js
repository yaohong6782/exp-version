const mysql = require("mysql2");
// import mysql from "mysql2";


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "track_express",
  connectionLimit: 10,
});

module.exports = { pool };
// export default pool;