// middlewares/global.middleware.js

import express from 'express';

const setupMiddlewares = (app) => {
    app.use(express.json());
    // Add more global middlewares here (CORS, morgan, etc.)
};

export default setupMiddlewares;
