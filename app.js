// app.js

// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Define User Schema with validation
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username already in use'],
      trim: true,
      minLength: [3, 'Username must be at least 3 characters'],
      maxLength: [20, 'Username must be at most 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already in use'],
      trim: true,
      lowercase: [true, 'Email must be lowercase'],
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

// Create User model from schema
const User = mongoose.model('User', userSchema);

// Health check route
app.get('/', (_, res) => {
  res.status(200).send('🚀 Messaging Platform API is live');
});

// User registration route
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = new User({ username, email, password });

    // Save user to database
    await user.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle duplicate key error (username/email already exists)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ error: `${duplicateField} already in use` });
    }
    // Handle other errors
    return res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🔥 Server listening on port ${PORT}`);
});
