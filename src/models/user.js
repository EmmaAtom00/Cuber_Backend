const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    driver: { type: Boolean, default: false },
    OTPs: {
      verifyOTP: {
        OTP: { type: String },
        createdAt: { type: Date },
        expiresAT: { type: Date },
      },
      resetOTP: {
        OTP: { type: String },
        createdAt: { type: Date },
        expiresAT: { type: Date },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
