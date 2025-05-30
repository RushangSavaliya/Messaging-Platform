const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Create schema and model for User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxLength: [30, 'Username cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // once set, cannot be changed
  },
});

// Use the schema and variables to avoid unused variable errors
const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Messaging Platform API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

