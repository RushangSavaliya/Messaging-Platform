// File: server.js

import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db.js';
import setupMiddlewares from './middlewares/global.middleware.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import initSocket from './sockets/initSocket.js';

// Load environment variables .env file
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Initialize Express app
const app = express();

// Connect to MongoDB
await connectDB(MONGO_URI);

// Setup global middlewares (JSON parsing, CORS, etc.)
setupMiddlewares(app);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`🔥 Server is running at http://localhost:${PORT}`);
});

// Initialize Socket.IO
initSocket(server);
