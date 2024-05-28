import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import { getUserFeed } from "../controllers/FeedController.js";
import auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Feed
 *   description: API for feed management
 */

/**
 * @swagger
 * /feed:
 *   get:
 *     tags: [Feed]
 *     summary: Get user feed
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User feed retrieved successfully
 */

router.get("/", auth, getUserFeed);

export default router;
