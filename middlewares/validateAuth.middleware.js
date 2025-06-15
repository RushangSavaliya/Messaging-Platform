// middlewares/validateAuth.middleware.js

export const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    next();
};

export const validateLogin = (req, res, next) => {
    const { usernameORemail, password } = req.body;
    if (!usernameORemail || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    next();
};

export const validateLogout = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Authorization token missing or malformed' });
    }
    next();
};