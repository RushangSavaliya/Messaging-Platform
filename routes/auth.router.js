// routes/auth.router.js

import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
        return res.status(400).json({
            error: 'All fields are required (username, email, password)',
        });
    }

    try {
        // Create new user
        const result = await User.create({ username, email, password });
        console.log('User created:', result);

        return res.status(201).json({
            message: 'User registered successfully',
        });
    } catch (error) {
        // Duplicate key error
        if (error.code === 11000) {
            const duplicatedField = Object.keys(error.keyPattern)[0];
            return res.status(409).json({
                error: `${duplicatedField} already exists`,
            });
        }

        return res.status(500).json({
            error: error.message,
        });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({
            error: 'Username and password are required',
        });
    }

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({
                error: 'Invalid username or password',
            });
        }
        return res.status(200).json({
            message: 'Login successful',
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
});

export default router;
