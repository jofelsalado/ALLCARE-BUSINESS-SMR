import express from "express";
const router = express.Router();
import {
  addRating,
  getRatings,
  getRatingsByAdvisor,
} from "../controllers/ratingController.js";

router.post("/", addRating);
router.get("/", getRatings);
router.post("/advisor", getRatingsByAdvisor);

export default router;
