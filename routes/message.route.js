// src/routes/message.route.js

import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import requireAuth from '../middlewares/requireAuth.middleware.js';
import updateLastUsed from '../middlewares/updateLastUsed.middleware.js';
import { validateMessage } from '../middlewares/validateMessage.middleware.js';

const router = express.Router();

// Protect every message route with session-check and timestamp refresh
router.use(requireAuth, updateLastUsed);

// POST   /api/messages       → send a message
// GET    /api/messages/:ID   → get chat history
router.post('/', validateMessage, sendMessage);
router.get('/:ID', getMessages);

export default router;
