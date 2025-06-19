// File: sockets/initSocket.js

import { Server } from 'socket.io';
import handleConnection from './handleConnection.js';

let ioInstance = null;

const initSocket = (server) => {
    ioInstance = new Server(server, {
        cors: { origin: '*' },
    });

    ioInstance.on('connection', handleConnection);
};

export const getIO = () => ioInstance; // 👈 allow controllers to access io

export default initSocket;
