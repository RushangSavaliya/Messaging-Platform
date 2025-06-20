// File: routes/message.route.js

import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import requireAuth from '../middlewares/requireAuth.middleware.js';
import { validateMessage } from '../middlewares/validateMessage.middleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(requireAuth);

// POST   /api/messages       → send a message
router.post('/', validateMessage, sendMessage);

// GET    /api/messages/:ID   → get chat history
router.get('/:ID', getMessages);

export default router;
