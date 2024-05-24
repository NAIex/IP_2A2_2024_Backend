import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import {
  addThread,
  getThreadCommunity,
  getThreads,
  removeThread,
} from "../controllers/ThreadController.js";
import auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Thread
 *   description: API for thread management
 */
/**
 * @swagger
 * /thread:
 *   get:
 *     tags: [Thread]
 *     summary: Return all threads or a specific thread
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The ID of the thread to retrieve
 *     responses:
 *       200:
 *         description: A list of threads or a specific thread
 *       401:
 *         description: Permission denied! User is not a member of the community.
 *       404:
 *         description: User or Thread does not exist
 *       500:
 *         description: Server error
 */
router.get("/", auth, getThreads);

/**
 * @swagger
 * /thread/community:
 *   get:
 *     tags: [Thread]
 *     summary: Return all threads and their communities
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of threads and communities
 */
router.get("/community", auth, getThreadCommunity);

/**
 * @swagger
 * /thread:
 *   post:
 *     tags: [Thread]
 *     summary: Add a new thread
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - communityId
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the thread
 *               description:
 *                 type: string
 *                 description: A description of the thread (Optional)
 *               communityId:
 *                 type: integer
 *                 description: The ID of the community to which the thread belongs
 *               type:
 *                 type: string
 *                 value: text or poll
 *                 description: The type of the thread (Optional)
 *     responses:
 *       201:
 *         description: Successfully created thread
 *       401:
 *         description: Permission denied! User is not a member of the community.
 *       404:
 *         description: User or Community does not exist
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  body("name").notEmpty(),
  body("communityId").notEmpty(),
  auth,
  ErrorMiddleware,
  addThread
);

/**
 * @swagger
 * /thread:
 *   delete:
 *     tags: [Thread]
 *     summary: Remove a thread
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - removeThreadId
 *             properties:
 *               removeThreadId:
 *                 type: integer
 *                 description: The ID of the thread to be removed
 *     responses:
 *       204:
 *         description: Successfully removed thread
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or Thread does not exist
 *       500:
 *         description: Server error
 */
router.delete(
  "/",
  body("removeThreadId").notEmpty(),
  auth,
  ErrorMiddleware,
  removeThread
);

export default router;
