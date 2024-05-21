import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import { getUsers } from "../controllers/UserController.js";
import Auth from "../middlewares/auth.js";

const router = Router();

// router.get('/',body('id').exists(),ErrorMiddleware,getUser);
router.get('/', Auth, getUsers);

export default router;