// File: routes/user.route.js

import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import getAllUsers from "../controllers/user.controller.js";

const router = express.Router();

router.use(requireAuth); // 🔒 protect all user routes

// GET /api/users → return all registered users
router.get("/", getAllUsers);

export default router;
