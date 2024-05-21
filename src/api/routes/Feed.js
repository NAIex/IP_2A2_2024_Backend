import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import { getUserFeed } from "../controllers/FeedController.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.get("/", auth, getUserFeed);

export default router;
