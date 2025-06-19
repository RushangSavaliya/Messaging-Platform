// src/controllers/message.controller.js

import { createMessage, getMessagesBetween } from '../services/message.service.js';

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.session.userId.toString();
        const { receiverId, content } = req.body;

        // Create and save the message
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

export const getMessages = async (req, res) => {
    try {
        const userA = req.session.userId.toString();
        const userB = req.params.withUserId;

        // Fetch sorted history between userA and userB
        const history = await getMessagesBetween(userA, userB);
        res.status(200).json({ messages: history });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
