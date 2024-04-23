import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import {
  getCommunity,
  addCommunity,
  removeCommunity,
  getUserToCommunity,
  addUserToCommunity,
  removeUserFromCommunity,
} from "../controllers/CommunityController.js";
const router = Router();

// only  for debbuging
router.get("/", getCommunity);
router.get("/get-user", getUserToCommunity);

router.post("/", body("name").notEmpty(), ErrorMiddleware, addCommunity);
router.post(
  "/add-user",
  body("userId").notEmpty(),
  body("communityId").notEmpty(),
  ErrorMiddleware,
  addUserToCommunity
);
router.delete(
  "/",
  body("authorId").notEmpty(),
  body("removeCommunityId").notEmpty(),
  ErrorMiddleware,
  removeCommunity
);

router.delete(
  "/remove-user",
  body("authorId").notEmpty(),
  body("userId").notEmpty(),
  body("communityId").notEmpty(),
  ErrorMiddleware,
  removeUserFromCommunity
);

export default router;
