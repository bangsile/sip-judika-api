import express from "express";
import {
	createMahasiswa,
	deleteMahasiswa,
	getMahasiswa,
	getMahasiswaByNpm,
  updateMahasiswa,
} from "../controllers/mahasiswa.controller.js";
import { loginMahasiswa } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getMahasiswa);
router.get("/:npm", getMahasiswaByNpm);
router.post("/", createMahasiswa);
router.patch("/:npm", updateMahasiswa);
router.delete("/:npm", deleteMahasiswa);

router.post("/login", loginMahasiswa);

export default router;
