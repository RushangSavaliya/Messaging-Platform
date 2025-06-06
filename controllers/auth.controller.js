// controllers/auth.controller.js

import User from '../models/User.js';
import { createSession, deleteSession } from '../services/session.service.js';

// ────────────────────────────────
// Register User
// ────────────────────────────────
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await User.create({ username, email, password });
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(409).json({ error: `${field} already exists` });
        }
        return res.status(500).json({ error: error.message });
    }
};

// ────────────────────────────────
// Login User
// ────────────────────────────────
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = await createSession(user._id);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// ────────────────────────────────
// Logout User
// ────────────────────────────────
export const logoutUser = async (req, res) => {
    const { token } = req.body;

    try {
        const session = await deleteSession(token);
        if (!session) {
            return res.status(401).json({ error: 'Invalid session token' });
        }
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
