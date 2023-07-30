import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
