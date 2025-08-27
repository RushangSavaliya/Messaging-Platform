// File: controllers/authController.js

import User from '../models/User.js';
import { generateToken } from '../utils/jwtUtils.js';

// ────────────────────────────────
// Register User
// ────────────────────────────────
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await User.create({ username, email, password });
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(409).json({ error: `${field} already exists` });
        }
        return res.status(500).json({ error: 'Registration failed: ' + error.message });
    }
};

// ────────────────────────────────
// Login User
// ────────────────────────────────
export const loginUser = async (req, res) => {
    const { usernameORemail, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ username: usernameORemail }, { email: usernameORemail }]
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ error: 'Login failed: ' + error.message });
    }
};

// ────────────────────────────────
// Logout User
// ────────────────────────────────
export const logoutUser = async (req, res) => {
    try {
        // With JWT, logout is handled client-side by removing the token
        // Optionally, you could implement a token blacklist here
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Logout failed: ' + error.message });
    }
};

// ────────────────────────────────
// Get Current Authenticated User
// ────────────────────────────────
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('_id username email');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch user: ' + error.message });
    }
};
