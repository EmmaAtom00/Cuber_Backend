const { passenger } = require("../../../models/ride");
const user = require("../../../models/user");

const selectLocation = async (req, res) => {
  try {
    const dbUser = await user.findOne({ email: req.user.email });

    if (!dbUser) return res.status(404).json({ msg: "User not found" });

    const existingRide = await passenger.findOne({ email: req.user.email });

    if (existingRide)
      return res
        .status(403)
        .json({ msg: "You have an existing ride, finish it or cancel it" });

    // console.log(req.body);
    const { currentLocation, destination, pickup } = req.body.dataToSend;
    const location = currentLocation;

    if (!(location && destination && pickup))
      return res
        .status(400)
        .json({ msg: "please enter your location and destination" });

    if (!(location.longitude && location.latitude))
      return res
        .status(400)
        .json({ msg: "can't get your location, try again..." });

    const ride = {
      email: req.user.email,
      location: {
        lng: Number(location.longitude),
        lat: Number(location.latitude),
      },
      destination,
      pickup,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
    };

    // console.log(ride);

    const save = await passenger.create(ride);

    return res.status(201).json({ msg: "successful" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch location name" });
  }
};

module.exports = selectLocation;
