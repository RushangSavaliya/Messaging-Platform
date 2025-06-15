// sockets/handleConnection.js

import { findSessionById } from '../services/session.service.js';
import updateLastUsedAt from '../services/updateLastUsedAt.js';

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

    console.log(`✅ Socket authenticated: ${socket.id} (user: ${session.userId})`);
    socket.emit('authorized', 'Connection established');

    await updateLastUsedAt(token);

    socket.on('disconnect', async () => {
        console.log(`⚠️ Disconnected: ${socket.id}`);
        try {
            await updateLastUsedAt(token);
        } catch (err) {
            console.error('Error updating last used at on disconnect:', err);
        }
    });
};

export default handleConnection;
