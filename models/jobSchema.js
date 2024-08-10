import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    role: {
      type: String,
      required: [true, "Please provide job role"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user details"],
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
