import { Router } from "express";
import wbl from "../controllers/WordBlacklist.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: WordBlacklist
 *   description: API for managing the word blacklist
 */

/**
 * @swagger
 * /blacklist:
 *   get:
 *     tags: [WordBlacklist]
 *     summary: Get all blacklisted words
 *     description: Retrieve a list of all words currently in the blacklist.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of blacklisted words returned successfully.
 */
router.get('/', auth, wbl.viewWordBlacklist);

/**
 * @swagger
 * /blacklist:
 *   put:
 *     tags: [WordBlacklist]
 *     summary: Add a word to the blacklist
 *     description: Adds a new word to the blacklist database.
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
 *         description: Word added to the blacklist successfully.
 *       '400':
 *         description: Bad request, the word is missing from the request body.
 *       '409':
 *         description: Conflict, the word already exists in the blacklist.
 *       '500':
 *         description: Internal server error.
 */
router.put('/', auth, wbl.addWordToWordBlacklist);

/**
 * @swagger
 * /blacklist:
 *   delete:
 *     tags: [WordBlacklist]
 *     summary: Remove a word from the blacklist
 *     description: Deletes a word from the blacklist database.
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
 *         description: Word removed from the blacklist successfully.
 *       '404':
 *         description: Not found, the word does not exist in the blacklist.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/', auth, wbl.deleteWordFromWordBlacklist);

/**
 * @swagger
 * /blacklist:
 *   post:
 *     tags: [WordBlacklist]
 *     summary: Check text for blacklisted words
 *     description: Checks if the given text contains any blacklisted words, even if they are part of other words.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: The text contains no prohibited words.
 *       '403':
 *         description: The text contains prohibited words.
 *       '500':
 *         description: Internal Server Error - Error occurred during the process.
 */

router.post('/', auth, wbl.checkText);

export default router;