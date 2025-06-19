// src/middlewares/updateLastUsed.middleware.js

import updateLastUsedAt from '../services/updateLastUsedAt.js';

export default async function updateLastUsed(req, _res, next) {
    try {
        // req.session._id is the Mongo ObjectId of the session
        await updateLastUsedAt(req.session._id.toString());
    } catch (err) {
        console.error('Failed to refresh session timestamp:', err.message);
    }
    next();
}
