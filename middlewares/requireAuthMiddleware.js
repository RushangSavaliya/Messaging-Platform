// File: middlewares/requireAuthMiddleware.js

import { verifyToken } from '../utils/jwtUtils.js';

const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ error: 'Authorization token missing or malformed' });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.userId = payload.userId;
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default requireAuth;
