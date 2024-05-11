import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import ban from "../controllers/BannedUsersController.js";

const router = Router();
/**
 * @swagger
 * /ban/viewBannedUsers:
 *   get:
 *     summary: View all banned users
 *     description: Shows a list of all the banned users on the platform.
 *     responses:
 *       '200':
 *         description: List of all the banned users
 */
router.get('/viewBannedUsers', ban.viewBannedUsers);
/**
 * @swagger
 * /ban/unbanUser:
 *   post:
 *     summary: Unban a user
 *     description: Changes a user's ban_status to false.
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
 *         description: User unbanned succesfully
 *       '404':
 *         description: User not registered
 *       '406':
 *         description: User is not banned
 */
router.post('/unbanUser', ban.unbanUser);
/**
 * @swagger
 * /ban/banUser:
 *   post:
 *     summary: Ban a user
 *     description: Changes a user's ban_status to true and sets their unban_date.
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
 *         description: User banned succesfully
 *       '400':
 *         description: Admins cannot be banned
 *       '404':
 *         description: User not registered
 *       '406':
 *         description: User is already banned
 */
router.post('/banUser', ban.banUser);
/**
 * @swagger
 * /ban/viewBanCandidates:
 *   get:
 *     summary: View all users that are ban candidates
 *     description: Shows a list of all the users that could be banned by an admin in the future.
 *     responses:
 *       '200':
 *         description: List of all the ban candidates
 */
router.get('/viewBanCandidates', ban.viewBanCandidates);

export default router;