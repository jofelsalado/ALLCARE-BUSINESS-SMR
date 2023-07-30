import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    profilePicture: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    // additional fields for Advisor
    expertise: {
      type: String,
    },
    education: {
      type: String,
    },
    company: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    civilStatus: {
      type: String,
    },
    educationalLevel: {
      type: String,
    },
    workAddress: {
      type: String,
    },
    occupation: {
      type: String,
    },
    credential: {
      type: String,
    },
    smokingStatus: {
      type: String,
    },
    salaryRange: {
      type: String,
    },
    religion: {
      type: String,
    },
    dependent1: {
      type: String,
    },
    dependent2: {
      type: String,
    },
    dependent3: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
