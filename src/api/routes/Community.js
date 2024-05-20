import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import {
  getCommunity,
  addCommunity,
  removeCommunity,
  getUserCommunity,
  addUserToCommunity,
  removeUserFromCommunity,
} from "../controllers/CommunityController.js";
import auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * /sample:
 *   get:
 *     summary: Returns a sample message
 *     responses:
 *       200:
 *         description: A successful response
 */

// only  for debbuging

router.get("/", auth, getCommunity);
router.get("/get-user", auth, getUserCommunity);

router.post("/", body("name").notEmpty(), auth, ErrorMiddleware, addCommunity);
router.delete(
  "/",
  body("removeCommunityId").notEmpty(),
  auth,
  ErrorMiddleware,
  removeCommunity
);

router.post(
  "/add-user",
  body("communityId").notEmpty(),
  auth,
  ErrorMiddleware,
  addUserToCommunity
);
router.delete(
  "/remove-user",
  body("userToRemoveId").notEmpty(),
  body("communityId").notEmpty(),
  auth,
  ErrorMiddleware,
  removeUserFromCommunity
);

export default router;
