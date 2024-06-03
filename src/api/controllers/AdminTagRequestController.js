import adminTag from "../services/adminTagRequests.services.js";

class AdminTagRequestController {

    static viewTagRequests = async (req, res, next) => {
        try {
            const list = await adminTag.viewTagRequests();
            res.status(200).json({
                status: true,
                message: 'List of all the tag requests',
                data: list
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static approveTag = async (req, res, next) => {
        try {
            const user = await adminTag.approveTag(req.body)
            res.status(200).json({
                status: true,
                message: 'Tag approved succesfully',
                data: user
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static rejectTag = async (req, res, next) => {
        try {
            const user = await adminTag.rejectTag(req.body)
            res.status(200).json({
                status: true,
                message: 'Tag rejected succesfully'
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }
}

export default AdminTagRequestController