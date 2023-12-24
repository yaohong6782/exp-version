const { pool } = require("@src/database/db");
const userQueries = require("@src/db-queries/usersQueries");
const postQueries = require("@src/db-queries/postsQueries");

const util= require('util');
const poolQuery = util.promisify(pool.query).bind(pool);

const getAllPost = (req, res) => {
  pool.query(
    // "SELECT * from posts JOIN " + "users where posts.user_id = users.id",

    "SELECT posts.id AS post_id, posts.*, users.id AS user_id, users.* FROM posts JOIN users ON posts.user_id = users.id",
    (error, results, field) => {
      if (error) {
        console.log("Error retrieving data");
      }

      //   console.log("Results ", results);
      //   console.log("results id " , results[0].id)

      const formattedResults = results.map((result) => ({
        id: result.post_id,
        questionTitle: result.questionTitle,
        questionUrl: result.question_url,
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

const postNewQuestion = async (req, res) => {
  console.log("post new question function called");
  const getUserQuery = "SELECT * FROM users WHERE username = ?";
  // userId is email
  const { questionTitle, content, userName, questionUrl, questionNumber } =
    req.body;

  try {
    const user = await userQueries.retrieveUserInfoFromUserName(userName);
    const userId = user[0].id;

    const insertPostQuery =
      "INSERT INTO posts (question_title, content, user_id, question_url, question_number) VALUES (?, ?, ?, ?, ?)";

    pool.query(
      insertPostQuery,
      [questionTitle, content, userId, questionUrl, questionNumber],
      (error, results, field) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Error inserting data into database ", error });
        }

        return res
          .status(200)
          .json({ message: `${questionTitle} successfully posted` });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user information");
  }
};

const getAllPostsRespectiveToUser = async (req, res) => {
    try {
      const { username } = req.body;
      console.log("username ", username);
  
      // First query to get user ID
      const userQueryResults = await poolQuery(
        "SELECT users.id FROM users WHERE username = ?",
        [username]
      );
  
      if (userQueryResults.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }
  
      const userId = userQueryResults[0].id;
  
      console.log("finding all posts by this user : ", userId);
  
      // Second query to get posts
      const postsQueryResults = await poolQuery(
        "SELECT p.*, u.* FROM posts p JOIN users u ON p.user_id = u.id WHERE p.user_id = ?",
        [userId]
      );
  
      if (postsQueryResults.length === 0) {
        return res.status(401).json({ error: "No records found" });
      }
  
  
      return res.status(200).json({ message: postsQueryResults });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = {
  getAllPost,
  postNewQuestion,
  getAllPostsRespectiveToUser,
};
