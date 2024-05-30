import cron from 'node-cron';
import prisma from '../../prisma/index.js';

export async function deleteOldConversations() {
    console.log('Running a scheduled task to clean up old conversations...');
    const threeDaysAgo = new Date(new Date().setDate(new Date().getDate() - 3));

    const conversations = await prisma.conversation.findMany({
        where: {
            lastMessageAt: {
                lt: threeDaysAgo,
            },
        },
        include: {
            messages: true,
        },
    });

    for (const conversation of conversations) {
        await prisma.message.deleteMany({
            where: { conversationId: conversation.id }
        });
        await prisma.conversation.delete({
            where: { id: conversation.id }
        });
        console.log(`Deleted conversation ${conversation.id} and its messages.`);
    }
}

export function setupCleanupTask() {
    // cron.schedule('0 0,8,16 * * *', deleteOldConversations);
    cron.schedule('* * * * *', deleteOldConversations);
}