// File: src/controllers/message.controller.js

import { createMessage, getMessagesBetween } from '../services/message.service.js';

// Send a new message
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.session.userId.toString();
        const { receiverId, content } = req.body;

        const message = await createMessage({
            sender: senderId,
            receiver: receiverId,
            content,
        });

        res.status(201).json({ message, status: 'sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get message history between two users
export const getMessages = async (req, res) => {
    try {
        const userA = req.session.userId.toString();
        const userB = req.params.withUserId;

        const history = await getMessagesBetween(userA, userB);

        res.status(200).json({ messages: history });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
