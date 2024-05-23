import { Router } from "express";
import tag from "../controllers/tags.controller.js";
import Auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: API for tags management
 */

/**
 * @swagger
 * /tag:
 *   get:
 *     tags: [Tags]
 *     summary: Get the list of tags
 *     description: Get the list of tags from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Tags displayed successfully
 */
router.get('/', Auth, tag.getTags);
/**
 * @swagger
 * /tag:
 *   post:
 *     tags: [Tags]
 *     summary: Post tag requests
 *     description: Post a tag request.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Tag request created successfully
 *       '400':
 *         description: Tag name required / Tag request already exists"
 */
router.post('/', Auth, tag.postTags);

export default router;