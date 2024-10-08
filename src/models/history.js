const mongoose = require("mongoose");

const driverHis = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    email: String,
    location: {
      lat: { type: Number },
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
    passengers: {
      type: Array,
    },
    success: Boolean,
  },
  { timestamps: true }
);

const driverHistory = mongoose.model("driverHistory", driverHis);

const passengerHis = new mongoose.Schema({
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
  destination: {
    type: String,
  },
  pickup: { type: String },
  driver: String,
  success: Boolean,
});

const passengerHistory = mongoose.model("passengerHistory", passengerHis);

module.exports = { driverHistory, passengerHistory };
