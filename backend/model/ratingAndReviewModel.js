import mongoose from "mongoose";

const ratingSchema = mongoose.Schema(
  {
    leadsId: {
      type: String,
    },
    leadsName: {
      type: String,
    },
    rating: {
      type: String,
    },
    review: {
      type: String,
    },
    advisorId: {
      type: String,
    },
    advisorName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
