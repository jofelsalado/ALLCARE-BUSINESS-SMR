import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    advisorId: {
      type: String,
      required: true,
    },
    leadsId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    availabilityId: {
      type: String,
      required: true,
    },
    consoltationFee: {
      type: String,
    },
    newAvailabilityId: {
      type: String,
    },
    appointmentStatus: {
      type: String,
      default: "Pending",
    },
    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
