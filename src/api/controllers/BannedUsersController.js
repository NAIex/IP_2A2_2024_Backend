import ban from "../services/ban.services.js";

class banController {

    static viewBannedUsers = async (req, res, next) => {
        try {
            const list = await ban.viewBannedUsers();
            res.status(200).json({
                status: true,
                message: 'Banned users: ',
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
                message: 'Ban candidates: ',
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
            const data = await ban.unbanUser(req.body)
            res.status(200).json({
                status: true,
                data
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static banUser = async (req, res, next) => {
        try {
            const data = await ban.banUser(req.body)
            res.status(200).json({
                status: true,
                data
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