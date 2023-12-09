// routes/userRoutes.js

const express = require("express");

const { authenticateToken } = require("@src/authentication/authenticationToken");
const userController = require("@src/controllers/userController");
const userRoutes = express.Router();

userRoutes.post("/signUp", userController.signUp);
userRoutes.post("/userLogin", userController.userLogin);

// userRoutes.post("/signUp", authenticateToken, signUp);
module.exports = userRoutes;