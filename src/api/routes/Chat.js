import { Router } from "express";
import { body } from "express-validator";
import ErrorMiddleware from "../middlewares/ErrorMiddleware.js";
import chat from "../controllers/ChatController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: API for chat management
 */

/**
 * /**
  * @swagger
 * /chat/{id}:
 *   get:
 *     tags: [Chat]
 *     summary: View all chats for a user
 *     description: Retrieves a list of chats for a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose chats are to be retrieved.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: List of all requested user chats
 *       '404':
 *         description: User does not have chats
 */
router.get('/:id', chat.getUserChats);
/**
 * @swagger
 * /chat/messages/{id}:
 *   get:
 *     tags: [Chat]
 *     summary: Display all messages in a specific chat
 *     description: Displays a list of all the messages in a specific chat of a specific user
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         description: The chat of which messages we will display.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Messages read successfully
 *       '404':
 *         description: Chat does not exist
 */
router.get('/messages/:id', chat.getChatMessages);


export default router;