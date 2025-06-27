// File: config/envConfig.js

import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;

export { default as connectDB } from './db.js';
