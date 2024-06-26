import auth from "../services/auth.services.js";

class authController {

    static register = async (req, res, next) => {
        try {
            const user = await auth.register(req.body);
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            })
        }
        catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static login = async (req, res, next) => {
        try {
            const data = await auth.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static logout = async (req, res, next) => {
        try {
            const data = await auth.logout(req.body)
            res.status(200).json({
                status: true,
                message: "Account logout successful",
                data
            })
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    static all = async (req, res, next) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
}

export default authController