// models/Session.js

// TODO: use this

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, 'User ID is required for session'],
            ref: 'User',
        },
        token: {
            type: String,
            required: [true, 'Session token is required'],
            unique: true,
            ref: 'User',
        },
        token: {
            type: String,
            required: [true, 'Session token is required'],
            unique: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
    },
    {
        collection: 'sessions',
        timestamps: false,
    }
);


const Session = model('Session', sessionSchema);

export default Session;
