import express from "express";
const router = express.Router();
import {
  addCompany,
  deleteCompany,
  getCompany,
  updateUser,
} from "../controllers/companyController.js";

router.post("/", addCompany);
router.put("/", updateUser);
router.post("/get-company", getCompany);
router.post("/delete", deleteCompany);

export default router;
