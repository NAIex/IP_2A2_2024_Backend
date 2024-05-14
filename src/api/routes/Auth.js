import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import user from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Data validation error
 *       '403':
 *         description: Email already registered
 */
router.post('/register', user.register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Logs in an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               chosenName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Account login successful
 *       '400':
 *         description: Invalid email or password
 *       '404':
 *         description: User not found
 */
router.post('/login', user.login);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     description: Logs out the current user.
 *     responses:
 *       '200':
 *         description: Logout successful
 */
router.post('/logout', user.logout);
/**
 * @swagger
 * /generateRandomName:
 *   get:
 *     summary: Generate random names
 *     description: Generates a list of 15 names from which the user can choose when they log in.
 *     requestBody:
 *       required: 
 *       content:
 *         application/json:
 *     responses:
 *       '200':
 *         description: Random names generated successfully
 */
router.get('/generateRandomName', user.generateRandomName);
/**
 * @swagger
 * /:
 *   get:
 *     summary: Show all users
 *     description: Shows all the users and admins registered on the platform, but only if you are logged in.
 *     requestBody:
 *       required: 
 *       content:
 *         application/json:
 *     responses:
 *       '200':
 *         description: All users
 */
router.get('/', auth, user.all);

export default router;