// const { pool } = require("@src/database/db");

// const saveCreatedPosts = ({
//   questionTitle,
//   content,
//   userId,
//   questionUrl,
//   questionNumber,
// }) => {
//   return new Promise((resolve, reject) => {
//     const insertPostQuery =
//       "INSERT INTO posts (question_title, content, user_id, question_url, question_number) VALUES (?, ?, ?, ?, ?)";

//     pool.query(
//       insertPostQuery,
//       [questionTitle, content, userId, questionUrl, questionNumber],
//       (error, results, fields) => {
//         if (error) {
//           console.log("Error inserting data into database ", error);
//           reject("Database error");
//         } else {
//           console.log("Successfully posted question");
//           resolve(`${questionTitle} has been successfully created`);
//         }
//       }
//     );
//   });
// };

// module.exports = {
//   saveCreatedPosts,
// };
