// import createError from 'http-errors'

// const auth = async (req, res, next) => {
    
//     if (!req.headers.authorization) {
//         return next(createError.Unauthorized('Access token is required'))
//     }
//     const token = req.headers.authorization.split(' ')[1]
//     if (!token) {
//         return next(createError.Unauthorized())
//     }
//     await token.verifyAccessToken(token).then(user => {
//         req.user = user
//         next()
//     }).catch (e => {
//         next(createError.Unauthorized(e.message))
//     })
//     next()
// }

// export default auth

import { verifyAccessToken } from '../utils/jwt.js'; // Adjust the import path as needed
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
