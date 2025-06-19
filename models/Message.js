// File: models/Message.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Sender ID is required'],
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Receiver ID is required'],
        },
        content: {
            type: String,
            trim: true,
            required: [true, 'Message content is required'],
            minlength: [1, 'Message must contain at least 1 character'],
            maxlength: [1000, 'Message must be under 1000 characters'],
        },
    },
    {
        timestamps: true,
        collection: 'messages',
    }
);

const Message = model('Message', messageSchema);

export default Message;
