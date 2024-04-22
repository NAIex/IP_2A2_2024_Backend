import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import {
  getCommunity,
  addCommunity,
  removeCommunity,
  addUserToCommunity,
} from "../controllers/CommunityController.js";
const router = Router();

// only  for debbuging
router.get("/", getCommunity);

router.post("/", body("name").notEmpty(), ErrorMiddleware, addCommunity);
router.post(
  "/add-user",
  body("user_id").notEmpty(),
  body("community_id").notEmpty(),
  ErrorMiddleware,
  addUserToCommunity
);
router.delete("/", body("id").notEmpty(), ErrorMiddleware, removeCommunity);

export default router;
