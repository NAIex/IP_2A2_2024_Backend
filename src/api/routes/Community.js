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
  turnOffCommunity,
  getCommunityThreads,
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

/**
 * @swagger
 * /community:
 *   get:
 *     tags: [Community]
 *     summary: Return all communities
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of communities
 */
router.get("/", auth, getCommunity);

/**
 * @swagger
 * /community/user:
 *   get:
 *     tags: [Community]
 *     summary: Return all communities and their users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of communities and users
 */
router.get("/user", auth, getUserCommunity);

/**
 * @swagger
 * /community:
 *   post:
 *     tags: [Community]
 *     summary: Add a new community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the community
 *               description:
 *                 type: string
 *                 description: A description of the community
 *     responses:
 *       201:
 *         description: Successfully created community
 *       404:
 *         description: User does not exist
 *       500:
 *         description: Server error
 */
router.post("/", body("name").notEmpty(), auth, ErrorMiddleware, addCommunity);

/**
 * @swagger
 * /community:
 *   delete:
 *     tags: [Community]
 *     summary: Remove a community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - removeCommunityId
 *             properties:
 *               removeCommunityId:
 *                 type: integer
 *                 description: The ID of the community to be removed
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
  body("removeCommunityId").notEmpty(),
  auth,
  ErrorMiddleware,
  removeCommunity
);

/**
 * @swagger
 * /community/user:
 *   post:
 *     tags: [Community]
 *     summary: Add a user to a community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - communityId
 *             properties:
 *               communityId:
 *                 type: integer
 *                 description: The ID of the community to which the user will be added
 *     responses:
 *       201:
 *         description: Successfully added user to community
 *       404:
 *         description: User or Community does not exist
 *       500:
 *         description: Server error
 */
router.post(
  "/user",
  body("communityId").notEmpty(),
  auth,
  ErrorMiddleware,
  addUserToCommunity
);
/**
 * @swagger
 * /community/user:
 *   delete:
 *     tags: [Community]
 *     summary: Remove a user from a community
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userToRemoveId
 *               - communityId
 *             properties:
 *               userToRemoveId:
 *                 type: integer
 *                 description: The ID of the user to be removed from the community
 *               communityId:
 *                 type: integer
 *                 description: The ID of the community from which the user will be removed
 *     responses:
 *       204:
 *         description: Successfully removed user from community
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or Community does not exist
 *       500:
 *         description: Server error
 */
router.delete(
  "/user",
  body("userToRemoveId").notEmpty(),
  body("communityId").notEmpty(),
  auth,
  ErrorMiddleware,
  removeUserFromCommunity
);

router.patch(
  "/turn-off",
  body("userId").notEmpty(),
  body("communityId").notEmpty(),
  body("type").notEmpty(),
  body("type").isIn(["archive", "disable"]),
  ErrorMiddleware,
  turnOffCommunity
);

/**
 * @swagger
 * community/{id}/threads:
 *   get:
 *     tags: [Community]
 *     summary: Return all threads for a specific community
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the community
 *     responses:
 *       200:
 *         description: A list of threads for the specified community
 *       404:
 *         description: User or Community does not exist
 *       500:
 *         description: Server error
 */

router.get("/:id/threads", auth, getCommunityThreads);

export default router;
