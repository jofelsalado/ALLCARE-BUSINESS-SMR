import express from "express";
const router = express.Router();
import {
  addCredentials,
  deleteCredentials,
  getUserCredentials,
} from "../controllers/credentialsController.js";

router.post("/add-credentials", addCredentials);
router.post("/", getUserCredentials);
router.post("/delete", deleteCredentials);

export default router;
