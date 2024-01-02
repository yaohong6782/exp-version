const express = require("express")

const { authenticateToken } = require("@src/authentication/authenticationToken");
const postsController = require("@src/controllers/postsController")

const postsRoutes = express.Router();

postsRoutes.get("/getAllPostsContent",  authenticateToken(["user", "admin"]) , postsController.getAllPost);

postsRoutes.post("/postContent", authenticateToken(["user", "admin"]), postsController.postNewQuestion);

postsRoutes.post("/getAllPostsRespectiveToUser", authenticateToken(["user"]), postsController.getAllPostsRespectiveToUser);

module.exports = postsRoutes;