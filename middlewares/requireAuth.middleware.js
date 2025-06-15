// middlewares/requireAuth.middleware.js

import { findSessionById } from '../services/session.service.js';

const PUBLIC_ROUTES = ['/login', '/register'];

const requireAuth = async (req, res, next) => {
    if (PUBLIC_ROUTES.includes(req.path)) {
        return next();
    }

    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ error: 'You are not authenticated' });
    }

    try {
        const session = await findSessionById(token);
        if (!session) {
            return res.status(401).json({ error: 'You are not authenticated' });
        }
        req.session = session;
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default requireAuth;
