// File: server.js

import express from 'express';

import { MONGO_URI, PORT, connectDB } from './config/envConfig.js';
import setupMiddlewares from './middlewares/global.middleware.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import initSocket from './sockets/initSocket.js';

// Connect to MongoDB
await connectDB(MONGO_URI);

// Initialize Express app
const app = express();

// Setup global middlewares (JSON parsing, CORS, etc.)
setupMiddlewares(app);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

//  Health check route
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`🔥 Server is running at http://localhost:${PORT}`);
});

// Initialize Socket.IO
initSocket(server);
