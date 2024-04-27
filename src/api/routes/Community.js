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
router.get("/", getCommunity);
router.get("/get-user", getUserCommunity);

router.post("/", body("name").notEmpty(), ErrorMiddleware, addCommunity);
router.delete(
  "/",
  body("userId").notEmpty(),
  body("removeCommunityId").notEmpty(),
  ErrorMiddleware,
  removeCommunity
);

router.post(
  "/add-user",
  body("userId").notEmpty(),
  body("communityId").notEmpty(),
  ErrorMiddleware,
  addUserToCommunity
);
router.delete(
  "/remove-user",
  body("userId").notEmpty(),
  body("userToRemoveId").notEmpty(),
  body("communityId").notEmpty(),
  ErrorMiddleware,
  removeUserFromCommunity
);

export default router;
