// middlewares/updateSessionActivity.middleware.js

import Session from '../models/Session.js';

// ──────────────────────────────
// Update Session Activity Middleware
// ──────────────────────────────

const updateSessionActivity = async (req, _res, next) => {
    const token = req.body.token;
    if (!token) return next();

    try {
        const session = await Session.findById(token);
        if (!session) return next();

        session.lastUsedAt = new Date();
        await session.save();

        req.userId = session.userId;
        next();
    } catch (error) {
        next(error);
    }
};

export default updateSessionActivity;
