import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import {
  getComments,
  getThreadDirectComments,
  getCommentSubcomment,
  addDirectComment,
  addSubcomment,
  deleteComment,
} from "../controllers/CommentController.js";
import auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: API for comments management
 */

/**
 * @swagger
 * /comment:
 *   get:
 *     tags: [Comment]
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
 * comment/direct:
 *   get:
 *     tags: [Comment]
 *     summary: Return all direct comments on threads or a specific thread's direct comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The ID of the thread to retrieve direct comments for
 *     responses:
 *       200:
 *         description: A list of direct comments on threads
 *       403:
 *         description: Permission denied! User is not a member of the community.
 *       404:
 *         description: User or Thread does not exist
 *       500:
 *         description: Server error
 */
router.get("/direct", auth, getThreadDirectComments);
/**
 * @swagger
 * comment/subcomment:
 *   get:
 *     tags: [Comment]
 *     summary: Return all subcomments or a specific comment's subcomments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: The ID of the comment to retrieve subcomments for
 *     responses:
 *       200:
 *         description: A list of subcomments
 *       403:
 *         description: Permission denied! User is not a member of the community.
 *       404:
 *         description: User or Comment does not exist
 *       500:
 *         description: Server error
 */
router.get("/subcomment", auth, getCommentSubcomment);

/**
 * @swagger
 * /comment:
 *   post:
 *     tags: [Comment]
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
 *       403:
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
 * /comment/subcomment:
 *   post:
 *     tags: [Comment]
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
 *       403:
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

/**
 * @swagger
 * /comment:
 *   delete:
 *     tags: [Comment]
 *     summary: Remove a comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - commentId
 *             properties:
 *               commentId:
 *                 type: integer
 *                 description: The ID of the comment to be removed
 *     responses:
 *       204:
 *         description: Successfully removed thread
 *       403:
 *         description: Permission denied!
 *       404:
 *         description: User or Comment does not exist
 *       500:
 *         description: Server error
 */

router.delete(
  "/",
  body("commentId").notEmpty(),
  auth,
  ErrorMiddleware,
  deleteComment
);

export default router;
