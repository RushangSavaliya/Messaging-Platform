// File: sockets/handleConnection.js

import Session from '../models/Session.js';
import User from '../models/User.js';
import { findSessionById } from '../services/session.service.js';
import { getIO } from './initSocket.js';

// 🔗 Global in-memory map: userId → socketId
export const activeUsers = new Map();

const broadcastActiveUsers = async () => {
    const userIds = Array.from(activeUsers.keys());

    const users = await User.find({ _id: { $in: userIds } }).select('_id username');
    const io = getIO();
    io.emit('active-users', users); // 🚀 Emit updated list to all
};

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

    activeUsers.set(userId, socket.id);
    console.log(`✅ Socket authenticated: ${socket.id} (user: ${userId})`);

    socket.emit('authorized', 'Connection established');

    // 🔄 Broadcast after connection
    await broadcastActiveUsers();

    socket.on('disconnect', async () => {
        console.log(`⚠️ Disconnected: ${socket.id}`);
        activeUsers.delete(userId);

        try {
            await Session.findByIdAndUpdate(token, { lastUsedAt: new Date() });
        } catch (err) {
            console.error('Error updating lastUsedAt:', err.message);
        }

        // 🔄 Broadcast after disconnection
        await broadcastActiveUsers();
    });
};

export default handleConnection;
