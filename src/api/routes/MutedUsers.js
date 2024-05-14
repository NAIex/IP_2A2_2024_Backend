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
 *         description: List of all the banned users
 */
router.get('/', mute.viewMutedUsers);
router.get('/viewMutedUsers', mute.viewMutedUsers);
router.post('/unmuteUser', mute.unmuteUser);
router.post('/muteUser', mute.muteUser);
router.get('/viewMuteCandidates', mute.viewMuteCandidates);

export default router;