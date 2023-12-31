// routes/userRoutes.js

const express = require("express");

const { authenticateToken } = require("@src/authentication/authenticationToken");
const userController = require("@src/controllers/userController");
const userRoutes = express.Router();


/**
 * @openapi
 * /users/signUp:
 *   post:
 *     description: User Sign Up
 *     requestBody:
 *       description: User details for sign up
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Returns message of successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Invalid input data"
 */
userRoutes.post("/signUp", userController.signUp);



/**
 * @openapi
 * /users/userLogin:
 *   post:
 *     description: User Sign Up
 *     requestBody:
 *       description: User details for sign up
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Returns JWT token on successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "JWT Token"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Invalid input data"
 */
userRoutes.post("/userLogin", userController.userLogin);


// userRoutes.post("/signUp", authenticateToken, signUp);
module.exports = userRoutes;