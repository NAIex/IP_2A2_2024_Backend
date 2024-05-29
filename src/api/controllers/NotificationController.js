import notification from "../services/notification.services.js";

class NotificationController {

    static getUserNotifications = async (req, res, next) => {
        try {
            const list = await notification.getUserNotifications(Number(req.params.userId));
            res.status(200).json({
                status: true,
                message: 'List of requested user notifications:',
                data: list
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static readNotification = async (req, res, next) => {
        try {
            const notif = await notification.readNotification(req.body);
            res.status(200).json({
                status: true,
                message: 'Notification read successfully',
                data: notif
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static readAllNotifications = async (req, res, next) => {
        try {
            const list = await notification.readAllNotifications(req.body)
            res.status(200).json({
                status: true,
                message: 'Notifications read successfully',
                data: list
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }
}

export default NotificationController