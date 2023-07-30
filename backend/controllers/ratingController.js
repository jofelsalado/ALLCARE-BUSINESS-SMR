import asyncHandler from "express-async-handler";
import Rating from "../model/ratingAndReviewModel.js";
import Appointment from "../model/appointmentModel.js";
import User from "../model/userModel.js";

const getRatings = asyncHandler(async (req, res) => {
  const ratingList = await Rating.find();

  res.status(200).send(ratingList);
});

const getRatingsByAdvisor = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const ratingList = await Rating.find({
    advisorId: userId,
  });

  res.status(200).send(ratingList);
});

const addRating = asyncHandler(async (req, res) => {
  const {
    advisorId,
    advisorName,
    rating,
    review,
    leadsId,
    leadsName,
    appointmentId,
  } = req.body;

  const appointmentDetails = await Appointment.findById({ _id: appointmentId });

  appointmentDetails.reason = "Thank you for your feedback";

  const advisorDetails = await User.findById({ _id: advisorId });

  advisorDetails.rating = parseInt(rating);

  await advisorDetails.save();

  await appointmentDetails.save();

  const doneRating = await Rating.create({
    advisorId: advisorId,
    advisorName: advisorName,
    rating: rating,
    review: review,
    leadsId: leadsId,
    leadsName: leadsName,
  });

  if (doneRating) {
    res.status(200).send({ message: "Thank you for your feedback" });
  }
});

export { addRating, getRatings, getRatingsByAdvisor };
