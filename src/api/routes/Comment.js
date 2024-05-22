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
 * /:
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

router.get("/direct", auth, getThreadDirectComments);
router.get("/subcomments", auth, getCommentSubcomment);

router.post(
  "/",
  body("content").notEmpty(),
  body("threadId").notEmpty(),
  auth,
  ErrorMiddleware,
  addDirectComment
);
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
