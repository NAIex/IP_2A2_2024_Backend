import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import ban from "../controllers/BannedUsersController.js";

const router = Router();

router.get('/', ban.viewBannedUsers);
router.get('/viewBannedUsers', ban.viewBannedUsers);
router.post('/unbanUser', ban.unbanUser);
router.post('/banUser', ban.banUser);
router.get('/viewBanCandidates', ban.viewBanCandidates);

export default router;