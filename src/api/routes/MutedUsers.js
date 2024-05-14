import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import mute from "../controllers/MutedUsersController.js";

const router = Router();
/**
 * @swagger
 * /mute/viewMutedUsers:
 *   get:
 *     summary: View all muted users
 *     description: Shows a list of all the muted users on the platform.
 *     responses:
 *       '200':
 *         description: List of all the muted users
 */
router.get('/viewMutedUsers', mute.viewMutedUsers);
/**
 * @swagger
 * /mute/unmuteUser:
 *   post:
 *     summary: Unmute a user
 *     description: Changes a user's mute_status to false.
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
 *         description: User unmute succesfully
 *       '404':
 *         description: User not registered
 *       '406':
 *         description: User is not muted
 */
router.post('/unmuteUser', mute.unmuteUser);
/**
 * @swagger
 * /mute/muteUser:
 *   post:
 *     summary: Mute a user
 *     description: Changes a user's mute_status to true, sets their unmute_date and 
 *          increases their warning count by 1.
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
 *         description: User muted succesfully
 *       '400':
 *         description: Admins cannot be muted
 *       '404':
 *         description: User not registered
 *       '406':
 *         description: User is already muted
 */
router.post('/muteUser', mute.muteUser);
/**
 * @swagger
 * /mute/viewMuteCandidates:
 *   get:
 *     summary: View all users that are mute candidates
 *     description: Shows a list of all the users that could be muted by an admin in the future.
 *     responses:
 *       '200':
 *         description: List of all the mute candidates
 */
router.get('/viewMuteCandidates', mute.viewMuteCandidates);

export default router;