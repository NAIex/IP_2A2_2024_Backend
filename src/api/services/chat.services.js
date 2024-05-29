import prisma from "../../prisma/index.js";

class ChatService {
    static async createMessage({ content, senderId, conversationId }) {
        return await prisma.Message.create({
            data: {
                content,
                senderId,
                conversationId,
            }
        });
    }

    static async findMessagesByConversation(conversationId) {
        return await prisma.Message.findMany({
            where: {
                conversationId
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
    }
}

export default ChatService;