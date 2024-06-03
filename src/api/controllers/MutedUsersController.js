import mute from "../services/mute.services.js";

class muteController {

    static viewMutedUsers = async (req, res, next) => {
        try {
            const list = await mute.viewMutedUsers();
            res.status(200).json({
                status: true,
                message: 'List of all the muted users',
                data: list
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static viewMuteCandidates = async (req, res, next) => {
        try {
            const list = await mute.viewMuteCandidates();
            res.status(200).json({
                status: true,
                message: 'List of all the mute candidates',
                data: list
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static unmuteUser = async (req, res, next) => {
        try {
            const user = await mute.unmuteUser(req.body)
            res.status(200).json({
                status: true,
                message: 'User unmuted succesfully',
                data: user
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static muteUser = async (req, res, next) => {
        try {
            const user = await mute.muteUser(req.body)
            res.status(200).json({
                status: true,
                message: 'User muted succesfully',
                data: user
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static sendMuteNotification = async (req, res, next) => {
        try {
            const data = await mute.sendMuteNotification();
            res.status(200).json({
                status: true,
                data
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }
}

export default muteController