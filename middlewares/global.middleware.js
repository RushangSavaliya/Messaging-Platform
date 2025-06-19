// File: middlewares/global.middleware.js

import cors from 'cors';
import express from 'express';

// ──────────────────────────────
// Global Middleware Registration
// ──────────────────────────────

const setupMiddlewares = (app) => {
    // Parse incoming JSON requests
    app.use(express.json());

    // Enable CORS for all routes
    app.use(cors());

    // Add additional global middlewares below
};

export default setupMiddlewares;
