import createError from "http-errors";
import prisma from "../../prisma/index.js";

class NotificationService {

    static async getUserNotifications(req) {
        let id = Number(req);

        const userNotifications = await prisma.Notification.findMany({
            where: { user_ID: id }
        });

        if(!userNotifications) {
            throw createError.NotFound("User does not have notifications");
        }

        try {
            const notifications = await prisma.Notification.findMany({
                where: {
                    user_ID: id
                },
                orderBy: {
                    time_sent: 'desc'
                }
            });
            return notifications;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while fetching notifications");
        }
    }

    static async readNotification(notificationData) {
        const { id } = notificationData;
    
        const notification = await prisma.Notification.findUnique({
            where: { notification_id: id }
        });
    
        if (!notification) {
            throw createError.NotFound("Notification does not exist");
        }
        
        if (notification.opened == true) {
            throw createError.Conflict("Notification already read");
        }

        await prisma.Notification.update({
            where: { notification_id: id },
            data: { 
                opened: true 
            }, 
        });

        return notification;
    }
    
    static async readAllNotifications(userData) {
        const { userId } = userData;

        const userNotifications = await prisma.Notification.findMany({
            where: { user_ID: userId }
        });

        if(!userNotifications) {
            throw createError.NotFound("User does not have notifications");
        }

        try {
            await prisma.Notification.updateMany({
                where: { user_ID: userId },
                data : {
                    opened: true
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while reading notifications");
        }
    }
}

export default NotificationService;