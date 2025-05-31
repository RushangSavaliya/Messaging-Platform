  // app.js

  // ──────────────────────────────
  // 1. IMPORTS
  // ──────────────────────────────
  import express from 'express';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import authRoutes from './routes/auth.router.js';

  // ──────────────────────────────
  // 2. CONFIGURATION
  // ──────────────────────────────
  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 3000;
  const MONGO_URI = process.env.MONGO_URI;

  // ──────────────────────────────
  // 3. MIDDLEWARE
  // ──────────────────────────────
  app.use(express.json());

  // ──────────────────────────────
  // 4. DATABASE CONNECTION
  // ──────────────────────────────
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
    })
    .catch((error) => {
      console.error('❌ MongoDB connection failed:', error.message);
      process.exit(1);
    });

  // ──────────────────────────────
  // 5. ROUTES
  // ──────────────────────────────
  app.use('/api/auth', authRoutes);

  // ──────────────────────────────
  // 6. SERVER INIT
  // ──────────────────────────────
  app.listen(PORT, () => {
    console.log(`🔥 Server listening on port ${PORT}`);
  });
