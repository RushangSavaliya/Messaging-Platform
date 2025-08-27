// File: routes/userRoutes.js

import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import requireAuth from '../middlewares/requireAuthMiddleware.js';

const router = express.Router();

// Get all users (protected route)
router.get('/', requireAuth, getAllUsers);

export default router;
