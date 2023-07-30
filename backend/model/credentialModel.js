import mongoose from "mongoose";

const credentialsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    credentials: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Credentials = mongoose.model("Credentials", credentialsSchema);

export default Credentials;
