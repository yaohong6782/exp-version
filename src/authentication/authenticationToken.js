// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("token ", token.substring(7));

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, missing token" });
  }

  jwt.verify(token.substring(7), "secretkey", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized, invalid token" });
    }
    console.log("user ", user);
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
