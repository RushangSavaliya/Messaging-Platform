// File: services/messageService.js

import Message from '../models/Message.js';

export const getMessagesBetween = async (userA, userB) => {
    return await Message.find({
        $or: [
            { sender: userA, receiver: userB },
            { sender: userB, receiver: userA },
        ],
    })
        .sort({ createdAt: 1 })
        .lean();
};

export const createMessage = async ({ sender, receiver, content }) => {
    const message = new Message({ sender, receiver, content });
    return await message.save();
};
