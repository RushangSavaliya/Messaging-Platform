// middlewares/global.middleware.js

import express from 'express';
import cors from 'cors';

// ──────────────────────────────────
// Global Middlewares Setup
// ──────────────────────────────────

const setupMiddlewares = (app) => {
    app.use(express.json());
    app.use(cors()); // Enable CORS for all routes

    // Add more global middlewares here
};

export default setupMiddlewares;
