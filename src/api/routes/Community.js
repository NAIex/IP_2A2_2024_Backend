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
 * tags:
 *   name: Community
 *   description: API for community management
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

/**
 * @swagger
 * /add-user:
 *   post:
 *     tags: [Community]
 *     summary: Add a user to a community
 *     parameters:
 *       - in: body
 *         name: community
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *             - communityId
 *           properties:
 *             userId:
 *               type: integer
 *               description: The ID of the user to be added to the community
 *             communityId:
 *               type: integer
 *               description: The ID of the community to which the user will be added
 *     responses:
 *       201:
 *         description: Successfully added user to community
 *       404:
 *         description: User or Community does not exist
 *       500:
 *         description: Server error
 */
router.post(
  "/add-user",
  body("communityId").notEmpty(),
  auth,
  ErrorMiddleware,
  addUserToCommunity
);

/**
 * @swagger
 * /remove-user:
 *   delete:
 *     tags: [Community]
 *     summary: Remove a user from a community
 *     parameters:
 *       - in: body
 *         name: community
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *             - userToRemoveId
 *             - communityId
 *           properties:
 *             userId:
 *               type: integer
 *               description: The ID of the user performing the removal
 *             userToRemoveId:
 *               type: integer
 *               description: The ID of the user to be removed from the community
 *             communityId:
 *               type: integer
 *               description: The ID of the community from which the user will be removed
 *     responses:
 *       204:
 *         description: Successfully removed user from community
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User, User to remove, or Community does not exist
 *       500:
 *         description: Server error
 */
router.delete(
  "/remove-user",
  body("userToRemoveId").notEmpty(),
  body("communityId").notEmpty(),
  auth,
  ErrorMiddleware,
  removeUserFromCommunity
);

export default router;
