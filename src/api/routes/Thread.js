import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import {
  addThread,
  getThreadCommunity,
  getThreads,
  removeThread,
} from "../controllers/ThreadController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", auth, getThreads);
router.get("/community", auth, getThreadCommunity);

router.post(
  "/",
  body("name").notEmpty(),
  body("communityId").notEmpty(),
  auth,
  ErrorMiddleware,
  addThread
);
router.delete(
  "/",
  body("removeThreadId").notEmpty(),
  auth,
  ErrorMiddleware,
  removeThread
);

export default router;
