import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import mute from "../controllers/MutedUsersController.js";

const router = Router();

router.get('/', mute.viewMutedUsers);
router.get('/viewMutedUsers', mute.viewMutedUsers);
router.post('/unmuteUser', mute.unmuteUser);
router.post('/muteUser', mute.muteUser);
router.get('/viewMuteCandidates', mute.viewMuteCandidates);

export default router;