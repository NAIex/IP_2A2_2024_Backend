import createError from "http-errors";
import prisma from "../../prisma/index.js";

class NotificationService {

    static async getUserNotifications(req) {
        const id = Number(req.query.userId);

        const userNotifications = await prisma.Notification.findMany({
            where: { user_ID: id }
        });

        if(!userNotifications) {
            throw new Error("User does not have notifications.");
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
            throw new Error("An error occurred while fetching notifications.");
        }
    }

    static async readNotification(notificationData) {
        const { id } = notificationData;
    
        const notification = await prisma.Notification.findUnique({
            where: { notification_id: id }
        });
    
        if (!notification) {
            throw new Error("Notification does not exist.");
        }
        
        if (notification.opened == true) {
            throw new Error("Notification already read.");
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
        const { id } = userData;

        const user = await prisma.User.findUnique({
            where: { id: id }
        });

        if(!user) {
            throw new Error("User does not have notifications.");
        }

        try {
            await prisma.Notification.updateMany({
                where: { user_ID: id },
                data : {
                    opened: true
                },
            });

            return this.getUserNotifications({ id });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while reading notifications.");
        }
    }
}

export default NotificationService;