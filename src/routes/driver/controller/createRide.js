const { driver } = require("../../../models/ride");
const user = require("../../../models/user");

const createRide = async (req, res) => {
  try {
    const dbUser = await user.findOne({ email: req.user.email });

    if (!dbUser) return res.status(404).json({ msg: "user not found" });

    const tripDetails = req.body;

    if (!(tripDetails.price && tripDetails.passenger_size))
      return res.status(400).json({ msg: "Please provide trip details" });

    const existingDetaiLs = await driver.findOne({ email: req.user.email });

    if (existingDetaiLs.price)
      return res.status(300).json({
        msg: "Your have an existing ride",
      });

    const ride = {
      price: Number(tripDetails.price),
      size: Number(tripDetails.passenger_size),
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      space: Number(tripDetails.passenger_size),
    };

    const update = await driver.findOneAndUpdate(
      { email: req.user.email },
      ride,
      { runValidators: true, new: false }
    );

    return res.status(201).json({ msg: "Your trip has been created" });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = createRide;
