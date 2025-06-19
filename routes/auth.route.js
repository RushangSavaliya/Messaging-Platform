// File: src/routes/auth.router.js

import express from 'express';

// Controllers
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser
} from '../controllers/auth.controller.js';

// Middlewares
import requireAuth from '../middlewares/requireAuth.middleware.js';
import {
    validateLogin,
    validateRegister
} from '../middlewares/validateAuth.middleware.js';

const router = express.Router();

// Auth Routes
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/logout', logoutUser);
router.get('/me', requireAuth, getCurrentUser);

export default router;
