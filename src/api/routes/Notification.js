import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import notification from "../controllers/NotificationController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: API for notification management
 */

/**
 * /**
  * @swagger
 * /notification/{id}:
 *   get:
 *     tags: [Notification]
 *     summary: View all notifications for a user
 *     description: Retrieves a list of notifications for a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose notifications are to be retrieved.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: List of all requested user notifications
 *       '404':
 *         description: User does not have notifications
 */
router.get('/:id', notification.getUserNotifications);
/**
 * @swagger
 * /notification:
 *   put:
 *     tags: [Notification]
 *     summary: Reads a notification
 *     description: Changes the selected notification's opened status to true.
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
 *         description: Notification read successfully
 *       '404':
 *         description: Notification does not exist
 *       '409':
 *         description: Notification already read
 */
router.put('/', notification.readNotification);
/**
 * @swagger
 * /notification:
 *   patch:
 *     tags: [Notification]
 *     summary: Reads all notifications
 *     description: Changes the status of opened for all notifications from an user to true.
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
 *         description: Notifications read successfully
 *       '404':
 *         description: User does not have notifications
 */
router.patch('/', notification.readAllNotifications);


export default router;