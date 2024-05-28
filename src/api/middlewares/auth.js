import { verifyAccessToken } from '../utils/jwt.js';
import createError from 'http-errors';

const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(createError.Unauthorized('Access token is required'));
    }

    const parts = req.headers.authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return next(createError.Unauthorized('Token format is "Bearer <token>"'));
    }

    const token = parts[1];

    try {
        const userData = await verifyAccessToken(token);
        req.user = userData;
        next();
    } catch (error) {
        next(error);
    }
};

export default auth;