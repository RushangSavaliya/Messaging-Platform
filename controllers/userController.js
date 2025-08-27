// File: controllers/userController.js

import User from '../models/User.js';

// Get all users (excluding password)
export const getAllUsers = async (_req, res) => {
    try {
        // Exclude password field from results
        const users = await User.find({}, '-password');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
