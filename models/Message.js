// File: models/Message.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            trim: true,
            required: [true, 'Message content is required'],
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
        collection: 'messages',
    }
);

const Message = model('Message', messageSchema);

export default Message;
