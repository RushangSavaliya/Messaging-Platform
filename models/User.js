// File: models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            minLength: [3, 'Username must be at least 3 characters'],
            maxLength: [20, 'Username must be at most 20 characters'],
            match: [
                /^[a-z0-9._]+$/,
                'Username can only contain lowercase letters, numbers, dots, and underscores',
            ],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
        },
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

const User = mongoose.model('User', userSchema);

export default User;
