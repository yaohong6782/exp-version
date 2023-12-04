const express = require("express")

const { authenticationToken } = require("@src/authentication/authenticationToken")
const postsController = require("@src/controllers/postsController")
const postsRoutes = express.Router();

postsRoutes.get("/getAllPostsContent",  postsController.getAllPost);

module.exports = postsRoutes;