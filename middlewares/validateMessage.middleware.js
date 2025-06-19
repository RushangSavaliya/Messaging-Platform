// src/middlewares/validateMessage.middleware.js

import mongoose from 'mongoose';

export const validateMessage = (req, res, next) => {
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
        return res
            .status(400)
            .json({ error: 'Both receiverId and content are required' });
    }

    // Check receiverId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ error: 'Invalid receiverId format' });
    }

    // Optional: enforce content length
    if (typeof content !== 'string' || content.trim().length < 1) {
        return res.status(400).json({ error: 'Content must be non-empty text' });
    }

    next();
};
