// File: controllers/user.controller.js

import User from "../models/User.js";

const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find({}, "_id username"); // Only return safe fields
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default getAllUsers
