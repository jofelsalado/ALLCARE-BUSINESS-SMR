import express from "express";
const router = express.Router();
import {
  addComplaint,
  deleteComplaint,
  getAllComplaint,
  getComplaintDetails,
} from "../controllers/complaintController.js";

router.route("/").get(getAllComplaint).post(addComplaint);
router.post("/details", getComplaintDetails);
router.post("/delete", deleteComplaint);

export default router;
