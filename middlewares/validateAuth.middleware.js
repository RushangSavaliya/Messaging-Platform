// File: middlewares/validateAuth.middleware.js

// Username validation regex: lowercase letters, numbers, dots, underscores
const USERNAME_REGEX = /^[a-z0-9._]+$/;
// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate registration fields
export const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;

    // Check presence and trim
    if (!username?.trim() || !email?.trim() || !password?.trim()) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Username: length and format
    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ error: 'Username must be 3-20 characters long' });
    }
    if (!USERNAME_REGEX.test(username)) {
        return res.status(400).json({ error: 'Username can only contain lowercase letters, numbers, dots, and underscores' });
    }

    // Email format
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Password length
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    next();
};

// Validate login fields
export const validateLogin = (req, res, next) => {
    const { usernameORemail, password } = req.body;

    if (!usernameORemail?.trim() || !password?.trim()) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    next();
};
