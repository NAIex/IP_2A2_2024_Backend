import ChatService from '../services/chat.services.js';

class ChatController {
    static async sendMessage(req, res) {
        const { content, conversationId } = req.body;
        const senderId = req.user.id;

        try {
            const message = await ChatService.createMessage({ content, senderId, conversationId });
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getMessages(req, res) {
        const { conversationId } = req.params;

        try {
            const messages = await ChatService.findMessagesByConversation(conversationId);
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async joinRoom(req, res) {
        // This endpoint should be adapted to your specific needs for socket connections.
        res.status(200).send("Join endpoint hit; implement based on Socket.IO setup.");
    }
}

export default ChatController;