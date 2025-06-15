// services/updateLastUsedAt.js

import Session from '../models/Session.js';

const updateLastUsedAt = async (token) => {
    try {
        const session = await Session.findById(token);

        session.lastUsedAt = new Date();
        await session.save();
    } catch (error) {
        console.error('❌ Failed to update lastUsedAt:', error.message);
    }
};

export default updateLastUsedAt;
