import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const secretKey = process.env.JWT_SECRET || 'your_default_secret';

const signAccessToken = (userId, email, isAdmin) => {
    return new Promise((resolve, reject) => {
        const payload = { userId, email, isAdmin };
        const options = { expiresIn: '1m' };

        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                reject(createError.InternalServerError('Failed to create the access token'));
            } else {
                resolve(token);
            }
        });
    });
};

const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                reject(createError.Unauthorized(message));
            } else {
                resolve(decoded);
            }
        });
    });
};

export default {
    signAccessToken,
    verifyAccessToken
};