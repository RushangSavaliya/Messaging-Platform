// models/Message.js

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
            required: [true, 'Message content is required'],
            trim: true,
        },
    },
    {
        collection: 'messages',
        timestamps: true, // adds createdAt and updatedAt
    }
);

const Message = model('Message', messageSchema);

export default Message;
