import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import adminTag from "../controllers/AdminTagRequestController.js";

const router = Router();
/**
 * @swagger
 * /:
 *   get:
 *     summary: View all tag requests
 *     description: Shows a list of all the banned users on the platform.
 *     responses:
 *       '200':
 *         description: List of all the current tag requests
 */
router.get('/', adminTag.viewTagRequests);
/**
 * @swagger
 * /:
 *   post:
 *     summary: Approve a tag request
 *     description: Adds a tag that was requested by a user into the tag list and removes it from the tag request list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Tag approved succesfully
 *       '404':
 *         description: Tag request not existent
 *       '409':
 *         description: Tag already exists
 */
router.post('/', adminTag.approveTag);
/**
 * @swagger
 * /:
 *   delete:
 *     summary: Reject a tag request
 *     description: Delete a tag request from the tag request list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Tag rejected succesfully
 *       '404':
 *         description: Tag request not existent
 */
router.delete('/', adminTag.rejectTag);

export default router;