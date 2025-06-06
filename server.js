// server.js

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.router.js';
import setupMiddlewares from './middlewares/global.middleware.js';
import updateSessionActivity from './middlewares/updateSessionActivity.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

setupMiddlewares(app);
app.use(updateSessionActivity);

await connectDB(MONGO_URI);

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Server listening on port ${PORT}`);
});
