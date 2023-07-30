import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
