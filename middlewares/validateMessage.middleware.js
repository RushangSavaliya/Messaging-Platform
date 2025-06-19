// File: src/middlewares/validateMessage.middleware.js

import mongoose from 'mongoose';

export const validateMessage = (req, res, next) => {
    const { receiverId, content } = req.body;

    // Validate presence and type of receiverId and content
    if (
        typeof receiverId !== 'string' ||
        typeof content !== 'string' ||
        receiverId.trim().length === 0 ||
        content.trim().length === 0
    ) {
        return res.status(400).json({
            error: 'Both receiverId and content are required'
        });
    }

    // Validate receiverId format (MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({
            error: 'Invalid receiverId format'
        });
    }

    next();
};
