// app.js

// ────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ────────────────────────────────────────────────────────────────
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
app.use(express.json()); // Parses incoming JSON requests

// ────────────────────────────────────────────────────────────────
// 4. DATABASE CONNECTION
// ────────────────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });

// ────────────────────────────────────────────────────────────────
// 5. SCHEMA & MODEL
// ────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minLength: [3, 'Username must be at least 3 characters'],
      maxLength: [20, 'Username must be at most 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [10, 'Password must be at least 10 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

// ────────────────────────────────────────────────────────────────
// 6. ROUTES
// ────────────────────────────────────────────────────────────────

// Health Check
app.get('/', (_, res) => {
  res.status(200).send('🚀 Messaging Platform API is live');
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Field validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ error: `${field} already in use` });
    }
    return res.status(400).json({ error: error.message });
  }
});

// ────────────────────────────────────────────────────────────────
// 7. SERVER INIT
// ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🔥 Server listening on port ${PORT}`);
});
