// models/Session.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        lastUsedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: 'sessions',
    }
);

// TTL Index: Auto-delete session after 28 days of inactivity
sessionSchema.index(
    { lastUsedAt: 1 },
    { expireAfterSeconds: 60 * 60 * 24 * 28 }
);

const Session = model('Session', sessionSchema);

export default Session;
