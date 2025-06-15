// sockets/initSocket.js

import { Server } from 'socket.io';
import handleConnection from './handleConnection.js';

const initSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', handleConnection);

    return io;
};

export default initSocket;
