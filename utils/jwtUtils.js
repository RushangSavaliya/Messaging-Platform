// File: utils/jwtUtils.js

import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days

const getJWTSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is required but not set');
    }
    return secret;
};

export const generateToken = (userId) => {
    return jwt.sign(
        { userId: userId.toString() },
        getJWTSecret(),
        { expiresIn: JWT_EXPIRES_IN }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, getJWTSecret());
    } catch (error) {
        return null;
    }
};
