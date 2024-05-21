import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import { getUserFeed } from "../controllers/FeedController.js";
import auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: /feed
 *   description: API for feed management
 */

/**
 * @swagger
 * :
 *   get:
 *     tags: [/feed]
 *     summary: Get user feed
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User feed retrieved successfully
 */

router.get("/", auth, getUserFeed);

export default router;
