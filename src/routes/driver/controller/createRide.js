const { driver } = require("../../../models/ride");
const user = require("../../../models/user");

const createRide = async (req, res) => {
  const dbUser = await user.findOne({ email: req.user.email });
  if (!dbUser) return res.status(404).json({ msg: "user not found" });
  const tripDetails = req.body;

  const ride = {
    // email: req.user.email,
    // location: {
    //   lng: Number(req.trip.lng),
    //   lat: Number(req.trip.lat),
    // },
    // destination: {
    //   lng: Number(destination.lng),
    //   lat: Number(destination.lat),
    // },
    price: tripDetails.price,
    size: tripDetails.passengerSize,
  };
  const update = await driver.findOneAndUpdate(
    { email: req.user.email },
    { ride },
    { runValidators: true, new: false }
  );
  return res.status(201).json({ msg: "Your trip has been created" });
};

module.exports = createRide;
