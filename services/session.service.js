// services/session.service.js
import Session from '../models/Session.js';

export const createSession = async (userId) => {
    const session = await Session.create({ userId });
    return session._id.toString();
};

export const deleteSession = async (token) => {
    return await Session.findByIdAndDelete(token);
};

export const findSessionById = async (token) => {
    return await Session.findById(token);
};
