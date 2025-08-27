// File: sockets/connectionHandler.js

import Session from '../models/Session.js';
import User from '../models/User.js';
import { findSessionById } from '../services/sessionService.js';

// 🔗 Global in-memory map: userId → ws
export const activeUsers = new Map();

const broadcastActiveUsers = async () => {
    const userIds = Array.from(activeUsers.keys());
    const users = await User.find({ _id: { $in: userIds } }).select('_id username');
    const payload = JSON.stringify({ event: 'active-users', data: users });

    for (const ws of activeUsers.values()) {
        if (ws.readyState === ws.OPEN) {
            ws.send(payload);
        }
    }
};

const handleConnection = async (ws, req) => {
    // Extract token from query string
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (!token) {
        ws.send(JSON.stringify({ event: 'unauthorized', data: 'Token required' }));
        ws.close();
        return;
    }

    const session = await findSessionById(token);

    if (!session) {
        ws.send(JSON.stringify({ event: 'unauthorized', data: 'Invalid session' }));
        ws.close();
        return;
    }

    const userId = session.userId.toString();

    activeUsers.set(userId, ws);

    ws.send(JSON.stringify({ event: 'authorized', data: 'Connection established' }));

    // Notify others this user is online
    const user = await User.findById(userId).select('_id username');
    for (const [otherId, otherWs] of activeUsers.entries()) {
        if (otherId !== userId && otherWs.readyState === otherWs.OPEN) {
            otherWs.send(JSON.stringify({ event: 'userOnline', data: user }));
        }
    }

    // 🔄 Broadcast after connection
    await broadcastActiveUsers();

    ws.on('close', async () => {
        activeUsers.delete(userId);

        try {
            await Session.findByIdAndUpdate(token, { lastUsedAt: new Date() });
        } catch (err) {
            console.error('Error updating lastUsedAt:', err.message);
        }

        // Notify others this user is offline
        for (const [otherId, otherWs] of activeUsers.entries()) {
            if (otherId !== userId && otherWs.readyState === otherWs.OPEN) {
                otherWs.send(JSON.stringify({ event: 'userOffline', data: userId }));
            }
        }

        // 🔄 Broadcast after disconnection
        await broadcastActiveUsers();
    });

    // Optionally handle incoming messages
    ws.on('message', async (msg) => {
        try {
            const parsed = JSON.parse(msg);
            if (parsed.event === 'getActiveUsers') {
                // Send only to this ws
                const userIds = Array.from(activeUsers.keys());
                const users = await User.find({ _id: { $in: userIds } }).select('_id username');
                ws.send(JSON.stringify({ event: 'active-users', data: users }));
            }
            // Add more event handlers here if needed
        } catch (e) {
            // Ignore malformed messages
        }
    });
};

export default handleConnection;
