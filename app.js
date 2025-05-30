// Import required packages
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB Connection error:', err));

// Define User schema with explicit collection name
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxLength: [30, 'Username cannot exceed 30 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
    },
    { collection: 'users' }
);

// Register User model
const User = mongoose.model('User', userSchema);

// Base route
app.get('/', (_, res) => {
    res.send('🚀 Messaging Platform API');
});

// Registration route
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: 'Email already in use' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});
