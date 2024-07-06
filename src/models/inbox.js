const mongoose = require("mongoose");

const inbox = new mongoose.Schema(
  {
    email: String,
    name: String,
    trip: String,
    driverEmail: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("inbox", inbox);
