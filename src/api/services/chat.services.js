import createError from "http-errors";
import prisma from "../../prisma/index.js";

class ChatService {

    static async getUserChats(req) {
        let id = Number(req);

        const userChats = await prisma.Conversation.findFirst({
            where: {
                OR: [
                {
                    userOneId: id
                },
                { 
                    userTwoId: id 
                },
                ],
            }
        });

        if(!userChats) {
            throw createError.NotFound("User does not have chats");
        }

        try {
            const chats = await prisma.Conversation.findMany({
                where: {
                    OR: [
                    {
                        userOneId: id
                    },
                    { 
                        userTwoId: id 
                    },
                    ],
                },
                orderBy: {
                    lastMessageAt: 'desc'
                }
            });
            return chats;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching chats");
        }
    }

    static async getChatMessages(chatData) {
        const {id} = chatData;
    
        const userChats = await prisma.Conversation.findFirst({
            where: { id : id }
        });

        if(!userChats) {
            throw createError.NotFound("Chat does not exist");
        }

        try {
            const messages = await prisma.Message.findMany({
                where: { conversationId : id },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return messages;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching messages");
        }
    }
}

export default ChatService;