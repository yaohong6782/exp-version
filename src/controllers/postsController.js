const { pool } = require("@src/database/db");
const userQueries = require("@src/db-queries/usersQueries");
const postQueries = require("@src/db-queries/postsQueries");

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
    
    // call saveCreatedPosts here

    // const message = await postQueries.saveCreatedPosts({
    //   questionTitle,
    //   content,
    //   userId,
    //   questionUrl,
    //   questionNumber,
    // });

    // Respond to the client after saving the post
    // res.status(201).json({
    //   message: message,
    // });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user information");
  }

};

const getAllPostRespectiveToUser = (req, res) => {

}

module.exports = {
  getAllPost,
  postNewQuestion,
};
