// const { pool } = require("@src/database/db");

// const retrieveUserInfoFromUserName = async (username) => {
//   return new Promise((resolve, reject) => {
//     pool.query(
//       "SELECT * FROM users where username = ?",
//       [username],
//       (error, results, field) => {
//         if (error) {
//           reject("Error executing the query");
//         }
//         resolve(results);
//       }
//     );
//   });
// };


// module.exports = {
//     retrieveUserInfoFromUserName
// }