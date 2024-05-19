// import jwt from 'jsonwebtoken';
// import createError from 'http-errors';

// let secretKey;
// try {
//     secretKey = fs.readFileSync('path_to_your_private_key.pem', 'utf8');
// } catch (error) {
//     console.error('Error loading the private key:', error);
//     throw createError.InternalServerError('Failed to load private key');
// }

// export async function signAccessToken(userId, email, isAdmin) {
//     try {
//         const payload = { userId, email, isAdmin };
//         const token = jwt.sign(payload, secretKey, { expiresIn: '1m' , algorithm: 'RS256'});
//         return token;
//     } catch (error) {
//         throw createError.InternalServerError('Unable to sign token');
//     }
// }

// export async function verifyAccessToken(token) {
//     try {
//         const decoded = jwt.verify(token, secretKey);
//         return decoded;
//     } catch (error) {
//         if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
//             throw createError.Unauthorized(error.message);
//         } else {
//             throw createError.InternalServerError('Token verification failed');
//         }
//     }
// }

import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import dotenv from 'dotenv';

dotenv.config(); // Ensures your .env variables are loaded into process.env

// Function to load a key from a file
function loadKey(filePath) {
    try {
        return fs.readFileSync(path.resolve(filePath), 'utf8');
    } catch (error) {
        console.error(`Error loading the key from ${filePath}:`, error);
        throw createError.InternalServerError(`Failed to load key from ${filePath}`);
    }
}

// Load RSA keys using environment variables
const privateKey = loadKey(process.env.PRIVATE_KEY_PATH);
const publicKey = loadKey(process.env.PUBLIC_KEY_PATH);

export async function signAccessToken(userId, email, isAdmin) {
    try {
        const payload = { userId, email, isAdmin };
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1m' });
        return token;
    } catch (error) {
        console.error('Error signing the token:', error);
        throw createError.InternalServerError('Unable to sign token');
    }
}

export async function verifyAccessToken(token) {
    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        return decoded;
    } catch (error) {
        console.error('Error verifying the token:', error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            throw createError.Unauthorized(error.message);
        } else {
            throw createError.InternalServerError('Token verification failed');
        }
    }
}
