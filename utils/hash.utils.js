// utils/hash.utils.js

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
