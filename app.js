// app.js

// ────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ────────────────────────────────────────────────────────────────
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';

// ────────────────────────────────────────────────────────────────
// 2. CONFIGURATION
// ────────────────────────────────────────────────────────────────
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ────────────────────────────────────────────────────────────────
// 3. MIDDLEWARE
// ────────────────────────────────────────────────────────────────
app.use(express.json());

// ────────────────────────────────────────────────────────────────
// 4. DATABASE CONNECTION
// ────────────────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });

// ────────────────────────────────────────────────────────────────
// 5. ROUTES
// ────────────────────────────────────────────────────────────────

// User Registration
app.post('/api/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic manual validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required (username, email, password)' });
  }

  try {
    const result = await User.create({ username, email, password });
    console.log('User created:', result);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ────────────────────────────────────────────────────────────────
// 6. SERVER INIT
// ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🔥 Server listening on port ${PORT}`);
});
