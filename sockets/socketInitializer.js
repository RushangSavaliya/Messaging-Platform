// File: sockets/socketInitializer.js

import { WebSocketServer } from 'ws';
import handleConnection from './connectionHandler.js';

let wssInstance = null;

const initSocket = (server) => {
    wssInstance = new WebSocketServer({ server });

    wssInstance.on('connection', handleConnection);
};

export const getWSS = () => wssInstance; // 👈 allow controllers to access wss

export default initSocket;
