const mongoose = require("mongoose");

const passengerRide = new mongoose.Schema(
  {
    email: { type: String, required: true },
    location: {
      lat: Number,
      lng: Number,
    },
    destination: {
      lat: Number,
      lng: Number,
    },
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
    location: {
      lat: Number,
      lng: Number,
    },
    destination: {
      lat: Number,
      lng: Number,
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
