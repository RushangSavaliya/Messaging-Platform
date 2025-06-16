// File: src/routes/auth.router.js

import express from 'express';
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser
} from '../controllers/auth.controller.js';

import {
    validateLogin,
    validateLogout,
    validateRegister
} from '../middlewares/validateAuth.middleware.js';

import requireAuth from '../middlewares/requireAuth.middleware.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/logout', validateLogout, logoutUser);
router.get('/me', requireAuth, getCurrentUser);

export default router;
