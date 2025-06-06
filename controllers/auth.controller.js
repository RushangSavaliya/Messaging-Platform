// controllers/auth.controller.js
import User from '../models/User.js';
import { createSession, deleteSession } from '../services/session.service.js';
import { hashPassword, comparePassword } from '../utils/hash.utils.js';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPwd = await hashPassword(password);
        await User.create({ username, email, password: hashedPwd });
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(409).json({ error: `${field} already exists` });
        }
        return res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = await createSession(user._id);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

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
