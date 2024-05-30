import prisma from '../../prisma/index.js';

const chatSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('join_room', async ({ userOneId, userTwoId }) => {
            const roomName = [userOneId, userTwoId].sort().join('_');
            socket.join(roomName);
            console.log(`User with ID: ${socket.id} joined room: ${roomName}`);

            // Upsert conversation to ensure it exists
            const conversation = await prisma.conversation.upsert({
                where: {
                    userOneId_userTwoId: {
                        userOneId: Math.min(userOneId, userTwoId),
                        userTwoId: Math.max(userOneId, userTwoId),
                    },
                },
                create: {
                    userOneId: Math.min(userOneId, userTwoId),
                    userTwoId: Math.max(userOneId, userTwoId),
                },
                update: {}
            });

            socket.emit('joined_room', conversation);
        });

        socket.on('send_message', async ({ content, senderId, receiverId, conversationId }) => {
            const message = await prisma.message.create({
                data: {
                    content,
                    senderId,
                    receiverId,
                    conversationId,
                }
            });

            const roomName = [senderId, receiverId].sort().join('_');
            io.to(roomName).emit('new_message', message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
    return io;
};

export default chatSocket;
