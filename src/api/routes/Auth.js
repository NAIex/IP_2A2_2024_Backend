import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import user from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);
router.get('/', auth, user.all);

export default router;