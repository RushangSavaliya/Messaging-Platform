// File: routes/authRoutes.js

import express from 'express';

// Controllers
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser
} from '../controllers/authController.js';

// Middlewares
import requireAuth from '../middlewares/requireAuthMiddleware.js';
import {
    validateLogin,
    validateRegister
} from '../middlewares/validateAuthMiddleware.js';

const router = express.Router();

// Auth Routes
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/logout', requireAuth, logoutUser);
router.get('/me', requireAuth, getCurrentUser);

export default router;
