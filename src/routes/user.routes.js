import express from "express";
import {
	createUser,
	deleteUser,
	getUser,
	getUserById,
	updateUser,
} from "../controllers/user.controller.js";
import { loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/login", loginUser);

export default router;
