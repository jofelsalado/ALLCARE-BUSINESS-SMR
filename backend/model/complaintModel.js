import mongoose from "mongoose";

const complaintSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    complainantName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    complaintId: {
      type: String,
    },
    complaintName: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
