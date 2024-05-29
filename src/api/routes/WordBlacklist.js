import { Router } from "express";
import wbl from "../controllers/WordBlacklist.controller.js";
import Auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Blacklist
 *   description: API for auth management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Blacklist]
 *     summary: Get all words from blacklist.
 *     description: Get all words from blacklist.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Words retrieved succesfully.
 */
router.get('/', Auth, wbl.viewWordBlacklist);
/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Blacklist]
 *     summary: Adds a new word to blacklist.
 *     description: Adds a new word to blacklist.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Word added succesfully.
 *       '400':
 *         description: Word already existing.
 */
router.put('/', Auth, wbl.addWordToWordBlacklist);
/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Blacklist]
 *     summary: Delete word from blacklist.
 *     description: Delete word from blacklist.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Word deleted succesfully.
 *       '404':
 *         description: Word not found in blacklist.
 */
router.delete('/', Auth, wbl.deleteWordFromWordBlacklist);

export default router;