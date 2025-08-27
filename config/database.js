// File: config/database.js

import mongoose from 'mongoose';

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;
