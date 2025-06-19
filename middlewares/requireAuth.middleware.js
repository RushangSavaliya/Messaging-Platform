// File: src/middlewares/requireAuth.middleware.js

import { findSessionById } from '../services/session.service.js';

const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ error: 'Authorization token missing or malformed' });
        }

        const session = await findSessionById(token);
        if (!session) {
            return res.status(401).json({ error: 'Invalid or expired session' });
        }

        req.session = session;
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default requireAuth;
