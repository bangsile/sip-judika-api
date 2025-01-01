import express from "express";
import { createPenelitian, deletePenelitian, getPenelitian, getPenelitianById, getPenelitianNpm, updatePenelitian } from "../controllers/penelitian.controller.js";

const router = express.Router();

router.get("/", getPenelitian);
router.get("/:id", getPenelitianById);
router.get("/npm/:npm", getPenelitianNpm);
router.post("/", createPenelitian);
router.patch("/:id", updatePenelitian);
router.delete("/:id", deletePenelitian);

export default router;
