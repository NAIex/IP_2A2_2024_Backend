import chat from "../services/chat.services.js";

class NotificationController {

    static getUserChats = async (req, res, next) => {
        try {
            let id = Number(req.params.id);
            const list = await chat.getUserChats(id);
            res.status(200).json({
                status: true,
                message: 'List of requested user chats:',
                data: list
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static getChatMessages = async (req, res, next) => {
        try {
            let id = Number(req.params.id);
            const list = await chat.getChatMessages(id);
            res.status(200).json({
                status: true,
                message: 'List of requested chat messages:',
                data: list
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }
}

export default NotificationController