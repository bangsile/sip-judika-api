import express from "express";
import {
	createDosen,
	deleteDosen,
	getDosen,
	getDosenByNidn,
	updateDosen,
} from "../controllers/dosen.controller.js";
import { loginDosen } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getDosen);
router.get("/:nidn", getDosenByNidn);
router.post("/", createDosen);
router.patch("/:nidn", updateDosen);
router.delete("/:nidn", deleteDosen);

router.post("/login", loginDosen);

export default router;
