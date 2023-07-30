import express from "express";
const router = express.Router();
import {
  authUser,
  addUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAdvisorUsers,
  getLeads,
  getAllUsers,
  changeToOffline,
  getUserDetails,
  accountManagement,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/advisor-list", getAdvisorUsers);
router.get("/leads-list", getLeads);
router.post("/", addUser);
router.get("/", getAllUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/change-to-offline", changeToOffline);
router.route("/profile").get(protect, getUserProfile).put(updateUserProfile);
router.post("/user-data", getUserDetails);
router.post("/account-management", accountManagement);

export default router;
