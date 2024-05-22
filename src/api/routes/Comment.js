import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import {
  getComments,
  getThreadDirectComments,
  getCommentSubcomment,
  addDirectComment,
  addSubcomment,
} from "../controllers/CommentController.js";
import auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: /comment
 *   description: API for comments management
 */

/**
 * @swagger
 * :
 *   get:
 *     tags: [/comment]
 *     summary: Return all comments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of comments
 */
router.get("/", auth, getComments);
/**
 * @swagger
 * /direct:
 *   get:
 *     tags: [/comment]
 *     summary: Return all direct comments on threads
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of direct comments on threads
 */
router.get("/direct", auth, getThreadDirectComments);

/**
 * @swagger
 * /subcomment:
 *   get:
 *     tags: [/comment]
 *     summary: Return all subcomments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of subcomments
 */
router.get("/subcomment", auth, getCommentSubcomment);

/**
 * @swagger
 * :
 *   post:
 *     tags: [/comment]
 *     summary: Add a new direct comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - threadId
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               threadId:
 *                 type: integer
 *                 description: The ID of the thread to comment on
 *     responses:
 *       201:
 *         description: Successfully added comment
 *       404:
 *         description: User or Thread does not exist
 *       401:
 *         description: Permission denied
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  body("content").notEmpty(),
  body("threadId").notEmpty(),
  auth,
  ErrorMiddleware,
  addDirectComment
);

/**
 * @swagger
 * /subcomment:
 *   post:
 *     tags: [/comment]
 *     summary: Add a new subcomment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - commentId
 *               - threadId
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the subcomment
 *               commentId:
 *                 type: integer
 *                 description: The ID of the comment to respond to
 *               threadId:
 *                 type: integer
 *                 description: The ID of the thread the comment belongs to
 *     responses:
 *       201:
 *         description: Successfully added subcomment
 *       404:
 *         description: User, Comment, or Thread does not exist
 *       401:
 *         description: Permission denied
 *       500:
 *         description: Server error
 */
router.post(
  "/subcomment",
  body("content").notEmpty(),
  body("commentId").notEmpty(),
  body("threadId").notEmpty(),
  auth,
  ErrorMiddleware,
  addSubcomment
);

export default router;
