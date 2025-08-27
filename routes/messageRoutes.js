// File: routes/messageRoutes.js

import express from 'express';
import { getMessages, sendMessage } from '../controllers/messageController.js';
import requireAuth from '../middlewares/requireAuthMiddleware.js';
import { validateMessage } from '../middlewares/validateMessageMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(requireAuth);

// POST   /api/messages       → send a message
router.post('/', validateMessage, sendMessage);

// GET    /api/messages/:ID   → get chat history
router.get('/:ID', getMessages);

export default router;
