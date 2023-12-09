const express = require("express")

const { authenticateToken } = require("@src/authentication/authenticationToken");
const postsController = require("@src/controllers/postsController")
const postsRoutes = express.Router();

postsRoutes.get("/getAllPostsContent",  authenticateToken , postsController.getAllPost);
postsRoutes.post("/postContent", authenticateToken, postsController.postNewQuestion);

module.exports = postsRoutes;