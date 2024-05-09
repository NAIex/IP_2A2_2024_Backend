import { Router } from "express";
import wbl from "../controllers/WordBlacklist.controller.js";

const router = Router();

/**
 * @swagger
 * /word-blacklist/viewWordBlacklist:
 *   post:
 *     summary: View Word Blacklist
 *     description: Retrieves the list of words in the blacklist.
 *     requestBody:
 *       required: false
 *     responses:
 *       '200':
 *         description: List of words in the blacklist
 *       '500':
 *         description: Internal server error
 */
router.post('/viewWordBlacklist', wbl.viewWordBlacklist);

/**
 * @swagger
 * /word-blacklist/addWordToWordBlacklist:
 *   post:
 *     summary: Add Word to WordBlacklist
 *     description: Adds a new word to the blacklist.
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
 *         description: Word added to blacklist successfully
 *       '400':
 *         description: Bad request or word already exists in blacklist
 *       '500':
 *         description: Internal server error
 */
router.post('/addWordToWordBlacklist', wbl.addWordToWordBlacklist);

/**
 * @swagger
 * /word-blacklist/deleteWordFromWordBlacklist:
 *   post:
 *     summary: Delete Word from WordBlacklist
 *     description: Deletes a word from the blacklist.
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
 *         description: Word deleted from blacklist successfully
 *       '400':
 *         description: Bad request or word not found in blacklist
 *       '500':
 *         description: Internal server error
 */
router.post('/deleteWordFromWordBlacklist', wbl.deleteWordFromWordBlacklist);

export default router;