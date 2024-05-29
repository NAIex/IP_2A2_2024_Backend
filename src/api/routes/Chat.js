// import { Router } from "express";
// import { body } from "express-validator";
// import chat from "../controllers/chat.controller.js";

// const router = Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Chat
//  *   description: API for auth management
//  */

// /**
//  * @swagger
//  * /register:
//  *   post:
//  *     tags: [Auth]
//  *     summary: Register new user
//  *     description: Creates a new user account.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       '200':
//  *         description: User created successfully
//  *       '400':
//  *         description: Data validation error
//  *       '403':
//  *         description: Email already registered
//  */
// router.post('/register', user.register);
// /**
//  * @swagger
//  * /login:
//  *   post:
//  *     tags: [Auth]
//  *     summary: User login
//  *     description: Logs in an existing user.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *               chosenName:
//  *                 type: string
//  *     responses:
//  *       '200':
//  *         description: Account login successful
//  *       '400':
//  *         description: Invalid email or password
//  *       '404':
//  *         description: User not found
//  */
// router.post('/login', user.login);

// //router.post('/logout', user.logout);

// /**
//  * @swagger
//  * /names:
//  *   get:
//  *     tags: [Auth]
//  *     summary: Generate random names
//  *     description: Generates a list of 15 names from which the user can choose when they log in.
//  *     requestBody:
//  *       required: 
//  *       content:
//  *         application/json:
//  *     responses:
//  *       '200':
//  *         description: Random names generated successfully
//  */
// router.get('/names', user.generateRandomNames);

// //router.get('/', auth, user.all);

// export default router;