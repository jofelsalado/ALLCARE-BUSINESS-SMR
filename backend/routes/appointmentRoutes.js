import express from "express";
const router = express.Router();
import {
  addAvailability,
  addNotes,
  adminAppointmentDetails,
  advisorAppointment,
  appointmentDetails,
  changeAppointmentStatus,
  deleteAvailability,
  deleteNotes,
  deleteNotification,
  getAllAppointmentDetails,
  getAllDetails,
  getAvailabilityByAdvisor,
  getNotes,
  getNotification,
  leadsAppointmentDetails,
  readNotification,
  setAppointment,
} from "../controllers/appointmentController.js";

router.post("/availability", addAvailability);
router.post("/my-availability", getAvailabilityByAdvisor);
router.post("/get-details", getAllDetails);
router.post("/get-all-details", getAllAppointmentDetails);
router.post("/set-appointment", setAppointment);
router.post("/leads-details", leadsAppointmentDetails);
router.post("/get-notification", getNotification);
router.post("/delete-notification", deleteNotification);
router.post("/read-notification", readNotification);
router.post("/appointment-details", appointmentDetails);
router.post("/advisor-appointment", advisorAppointment);
router.put("/change-status", changeAppointmentStatus);
router.post("/delete-availability", deleteAvailability);
router.post("/add-notes", addNotes);
router.post("/get-notes", getNotes);
router.post("/delete-notes", deleteNotes);
router.get("/admin-appointment-details", adminAppointmentDetails);

export default router;
