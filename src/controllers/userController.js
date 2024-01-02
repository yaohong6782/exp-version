// controllers/userController.js
const { pool } = require("@src/database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signUp = (req, res) => {
  console.log(req.body)
  const { username, password, role } = req.body;

  // Check for empty username or password
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Hash the password
  bcrypt.hash(password, 10, (hashError, hashedPassword) => {
    if (hashError) {
      console.error("Error hashing password:", hashError);
      return res.status(500).json({ error: "Password hashing error" });
    }

    console.log("new hashed password ", password);
    // Insert data into the database with hashed password
    pool.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role],
      (error, results, fields) => {
        if (error) {
          console.error("Error inserting data into the database:", error);
          return res.status(500).json({ error: "Database error" });
        }

        console.log("Data inserted into the database successfully");
        res
          .status(200)
          .json({ message: `${username} have been successfully created` });
      }
    );
  });
};

const userLogin = (req, res) => {
  const { username, password } = req.body;

  // Retrieve hashed password from the database based on the provided username
  pool.query(
    "SELECT * FROM track_express.users WHERE username = ?",
    [username],
    (error, results, fields) => {
      if (error) {
        console.log("Error retrieving user data : ", error);
        return res.status(500).json({ error: "Database error" });
      }

      // If results does not exist
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const hashedPasswordFromDB = results[0].password;
      console.log(hashedPasswordFromDB);
      // Compare hashed password from the database with the provided password
      bcrypt.compare(password, hashedPasswordFromDB, (compareError, match) => {
          if (compareError) {
            console.error("Error comparing passwords:", compareError);
            return res.status(500).json({ error: "Password comparison error" });
          }

        if (match) {
          console.log("Login successful");
          const jwtToken = jwt.sign({username : results[0].username, role: results[0].role}, "secretkey", {algorithm : 'HS256', expiresIn : '2 days'})
          console.log('jwt token ' , jwtToken);
          res.status(200).json({ accessToken: jwtToken });
        } else {
          console.log("Invalid username or password");
          res.status(401).json({ error: "Invalid username or password" });
        }
      });
    }
  );
};
module.exports = {
  signUp,
  userLogin,
};
