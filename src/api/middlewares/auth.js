// momentan nu merge logout ul

// import jwt from 'jsonwebtoken';
// import createError from 'http-errors';
// import redisClient from '../utils/redisClient.js';

// const isAuthenticated = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return next(createError.Unauthorized('Authorization token required'));
//     }

//     const token = authHeader.split(' ')[1];
//     try {
//         const isBlacklisted = await redisClient.get(`blacklisted:${token}`);
//         if (isBlacklisted) {
//             throw createError.Unauthorized('Token has been blacklisted');
//         }
        
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         next(createError.Unauthorized(error.message));
//     }
// };

// export default isAuthenticated;



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