// server.js

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import setupMiddlewares from './middlewares/global.middleware.js';
import requireAuth from './middlewares/requireAuth.middleware.js';
import authRoutes from './routes/auth.route.js';
import initSocket from './sockets/initSocket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
await connectDB(MONGO_URI);

// Setup global middlewares
setupMiddlewares(app);

// Setup routes
app.use('/api/auth', requireAuth, authRoutes);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🔥 Server is running on port http://localhost:${PORT}`);
});

// Initialize Socket.IO
initSocket(server);
