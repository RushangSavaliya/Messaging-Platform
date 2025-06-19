// File: src/middlewares/validateMessage.middleware.js

import mongoose from 'mongoose';

export const validateMessage = (req, res, next) => {
    const { receiverId, content } = req.body;

    // Check required fields
    if (!receiverId || !content) {
        return res.status(400).json({
            error: 'Both receiverId and content are required'
        });
    }

    // Validate receiverId format
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({
            error: 'Invalid receiverId format'
        });
    }

    // Validate content
    if (typeof content !== 'string' || content.trim().length < 1) {
        return res.status(400).json({
            error: 'Content must be non-empty text'
        });
    }

    next();
};
