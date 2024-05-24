const { passenger } = require("../../../models/ride");
const user = require("../../../models/user");

const selectLocation = async (req, res) => {
  const dbUser = user.findOne({ email: req.user.email });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const existingRide = await passenger.findOne({ email: req.user.email });
  if (existingRide)
    return res
      .status(403)
      .json({ msg: "You have an existing ride, finish it or cancel it" });
  const { location, destination } = req.body;
  if (!(location && destination))
    return res
      .status(400)
      .json({ msg: "please enter your location and destination" });
  try {
    const ride = {
      email: req.user.email,
      location: {
        lng: Number(location.lng),
        lat: Number(location.lat),
      },
      destination: {
        lng: Number(destination.lng),
        lat: Number(destination.lat),
      },
    };
    console.log(ride);
    const save = await passenger.create(ride);
    return res.status(201).json({ msg: "successful" });
  } catch (error) {
    return res.status(400).json({ error: error._message });
  }
};

module.exports = selectLocation;
