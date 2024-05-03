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
 * tags:
 *   name: Community
 *   description: API for community management
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Community]
 *     summary: Return all communities [only for debugging]
 *     responses:
 *       200:
 *         description: A list of communities
 */
router.get("/", getCommunity);

/**
 * @swagger
 * /get-user:
 *   get:
 *     tags: [Community]
 *     summary: Return all communities and it's users [only for debugging]
 *     responses:
 *       200:
 *         description: A list of communities and users
 */
router.get("/get-user", getUserCommunity);

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Community]
 *     summary: Add a new community
 *     parameters:
 *       - in: body
 *         name: community
 *         schema:
 *           type: object
 *           required:
 *             - authorId
 *             - name
 *             - description
 *           properties:
 *             authorId:
 *               type: integer
 *               description: The ID of the author creating the community
 *             name:
 *               type: string
 *               description: The name of the community
 *             description:
 *               type: string
 *               description: A description of the community
 *     responses:
 *       201:
 *         description: Successfully created community
 *       404:
 *         description: User does not exist
 *       500:
 *         description: Server error
 */
router.post("/", body("name").notEmpty(), ErrorMiddleware, addCommunity);

/**
 * @swagger
 * /:
 *   delete:
 *     tags: [Community]
 *     summary: Remove a community
 *     parameters:
 *       - in: body
 *         name: community
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *             - removeCommunityId
 *           properties:
 *             userId:
 *               type: integer
 *               description: The ID of the user removing the community
 *             removeCommunityId:
 *               type: integer
 *               description: The ID of the community to be removed
 *     responses:
 *       204:
 *         description: Successfully removed community
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or Community does not exist
 *       500:
 *         description: Server error
 */
router.delete(
  "/",
  body("userId").notEmpty(),
  body("removeCommunityId").notEmpty(),
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
  body("userId").notEmpty(),
  body("communityId").notEmpty(),
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
  body("userId").notEmpty(),
  body("userToRemoveId").notEmpty(),
  body("communityId").notEmpty(),
  ErrorMiddleware,
  removeUserFromCommunity
);

export default router;
