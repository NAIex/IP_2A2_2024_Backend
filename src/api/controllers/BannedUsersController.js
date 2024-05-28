import ban from "../services/ban.services.js";

class banController {

    static viewBannedUsers = async (req, res, next) => {
        try {
            const list = await ban.viewBannedUsers();
            res.status(200).json({
                status: true,
                message: 'List of all the banned users',
                data: list
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static viewBanCandidates = async (req, res, next) => {
        try {
            const list = await ban.viewBanCandidates();
            res.status(200).json({
                status: true,
                message: 'List of all the ban candidates',
                data: list
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static unbanUser = async (req, res, next) => {
        try {
            const user = await ban.unbanUser(req.body)
            res.status(200).json({
                status: true,
                message: 'User unbanned succesfully',
                data: user
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static banUser = async (req, res, next) => {
        try {
            const user = await ban.banUser(req.body)
            res.status(200).json({
                status: true,
                message: 'User banned succesfully',
                data: user
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static sendBanNotification = async (req, res, next) => {
        try {
            const data = await ban.sendBanNotification();
            res.status(200).json({
                status: true,
                data: list
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }
}

export default banController