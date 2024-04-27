import auth from "../services/auth.services.js";

class authController {

    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Register new user
     *     description: Creates a new user account.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: User created successfully
     *       '400':
     *         description: Data validation error
     *       '403':
     *         description: Email already registered
     */
    static register = async (req, res, next) => {
        try {
            const user = await auth.register(req.body);
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };

    /**
     * @swagger
     * /login:
     *   post:
     *     summary: User login
     *     description: Logs in an existing user.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Account login successful
     *       '400':
     *         description: Invalid email or password
     *       '404':
     *         description: User not found
     */c
    static login = async (req, res, next) => {
        try {
            const data = await auth.login(req.body);
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };

    /**
     * @swagger
     * /generateRandomName:
     *   post:
     *     summary: Generate random name
     *     description: Generates a random name.
     *     responses:
     *       '200':
     *         description: Random name generated successfully
     */
    static generateRandomName = async (req, res, next) => {
        try {
            const data = await auth.generateRandomName();
            res.status(200).json({
                status: true,
                message: "Random names generated successfully",
                data
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };

    /**
     * @swagger
     * /logout:
     *   post:
     *     summary: User logout
     *     description: Logs out the current user.
     *     responses:
     *       '200':
     *         description: Account logout successful
     */
    static logout = async (req, res, next) => {
        try {
            const data = await auth.logout(req.body);
            res.status(200).json({
                status: true,
                message: "Account logout successful",
                data
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };

     /**
     * @swagger
     * /:
     *   get:
     *     summary: Get all users
     *     description: Retrieves all users.
     *     responses:
     *       '200':
     *         description: List of users
     */
    static all = async (req, res, next) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            });
        } catch (e) {
            next(e);
            console.log(e);
            res.send(e);
        }
    };
}

export default authController;
