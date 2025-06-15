// routes/auth.router.js

import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
import { validateRegister, validateLogin, validateLogout } from '../middlewares/validateAuth.middleware.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/logout', validateLogout, logoutUser);

export default router;
