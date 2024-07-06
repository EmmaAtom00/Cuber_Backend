const mongoose = require("mongoose");

const passengerRide = new mongoose.Schema(
  {
    email: { type: String, required: true },
    firstName: String,
    lastName: String,
    location: {
      lat: Number,
      lng: Number,
    },
    destination: {
      type: String,
    },
    pickup: { type: String },
    schedule: {
      startTime: String,
      endTime: String,
    },
    driver: String,
    success: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const passenger = mongoose.model("passengerRide", passengerRide);

const DriverRide = new mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    size: Number,
    price: Number,
    passengers: Array,
    location: {
      lat: Number,
      lng: Number,
    },
    destination: {
      type: String,
    },
    pickup: {
      type: String,
    },
    schedule: {
      startTime: String,
      endTime: String,
    },
  },
  { timestamps: true }
);

const driver = mongoose.model("driverRide", DriverRide);

module.exports = {
  passenger,
  driver,
};
