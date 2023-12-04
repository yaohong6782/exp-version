const { pool } = require("@src/database/db");

const getAllPost = (req, res) => {
  pool.query(
    // "SELECT * from posts JOIN " + "users where posts.user_id = users.id",

    "SELECT posts.id AS post_id, posts.*, users.id AS user_id, users.* FROM posts JOIN users ON posts.user_id = users.id",
    (error, results, field) => {
      if (error) {
        console.log("Error retrieving data");
      }

      console.log("Results ", results);
      //   console.log("results id " , results[0].id)

      const formattedResults = results.map((result) => ({
        id: result.post_id,
        questionTitle: result.questionTitle,
        questionUrl : result.question_url,
        content: result.content,
        users: {
          id: result.user_id,
          username: result.username,
          password: result.password,
          role: result.role,
        },
      }));
      res.status(200).json({ result: formattedResults });
    }
  );
};

module.exports = {
  getAllPost,
};
