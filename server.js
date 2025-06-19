// server.js

import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import setupMiddlewares from './middlewares/global.middleware.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js'; // ← new import
import initSocket from './sockets/initSocket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
await connectDB(MONGO_URI);

// Setup global middlewares (JSON parsing, CORS, etc.)
setupMiddlewares(app);

// Mount auth API
app.use('/api/auth', authRoutes);

// Mount messaging API
app.use('/api/messages', messageRoutes);   // ← new mount

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`🔥 Server is running on port http://localhost:${PORT}`);
});

// Initialize Socket.IO
initSocket(server);
