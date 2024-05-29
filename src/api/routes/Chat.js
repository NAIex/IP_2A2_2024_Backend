import { Router } from "express";
import { body } from "express-validator";
import chat from '../controllers/chat.controller.js';

const router = Router();

router.post('/message', chat.sendMessage);

router.get('/messages/:conversationId', chat.getMessages);

router.post('/join', chat.joinRoom);

export default router;