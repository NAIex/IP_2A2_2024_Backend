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
router.post('/login', user.login);
router.post('/logout', user.logout);
router.get('/', auth, user.all);

export default router;