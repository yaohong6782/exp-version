// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const authenticateToken = (allowedRoles = []) => (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, missing token" });
  }

  jwt.verify(token.substring(7), "secretkey", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized, invalid token" });
    }
    console.log("user ", user);
    console.log("user role ", user.role)

    // if allowedRoles does not contain these roles
    // unauthorised access
    if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({error : "Unauthorised role"})
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
