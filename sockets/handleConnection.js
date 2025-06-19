// File: sockets/handleConnection.js

import Session from '../models/Session.js';
import { findSessionById } from '../services/session.service.js';

// 🔗 Global in-memory map: userId → socketId
export const activeUsers = new Map();

const handleConnection = async (socket) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        console.log('❌ Rejected: No token');
        socket.emit('unauthorized', 'Token required');
        socket.disconnect(true);
        return;
    }

    const session = await findSessionById(token);

    if (!session) {
        console.log('❌ Rejected: Invalid session');
        socket.emit('unauthorized', 'Invalid session');
        socket.disconnect(true);
        return;
    }

    const userId = session.userId.toString();

    // 🧠 Store user socket
    activeUsers.set(userId, socket.id);

    console.log(`✅ Socket authenticated: ${socket.id} (user: ${userId})`);
    socket.emit('authorized', 'Connection established');

    // 🧹 Handle disconnect
    socket.on('disconnect', async () => {
        console.log(`⚠️ Disconnected: ${socket.id}`);
        activeUsers.delete(userId); // clean up
        try {
            await Session.findByIdAndUpdate(token, { lastUsedAt: new Date() });
        } catch (err) {
            console.error('Error updating lastUsedAt:', err.message);
        }
    });
};

export default handleConnection;
