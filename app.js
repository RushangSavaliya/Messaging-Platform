// File: app.js

import dotenv from 'dotenv';
import express from 'express';
import http from 'http';

import connectDB from './config/database.js';
import setupMiddlewares from './middlewares/globalMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import initSocket from './sockets/socketInitializer.js';

// Load environment variables from .env file
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
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Health check route
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start HTTP server
server.listen(PORT, () => {
    console.log(`🔥 Server is running at http://localhost:${PORT}`);
});
