const { driver } = require("../../../models/ride");
const user = require("../../../models/user");

const getDriverLocation = async (req, res) => {
  try {
    const location = req.body.dataToSend.currentLocation;

    const destination = req.body.dataToSend.destination;

    const pickup = req.body.dataToSend.pickup;

    const User = await user.findOne({ email: req.user.email });

    if (!User) return res.status(404).json({ msg: "User not found" });

    if (
      !(
        location.latitude &&
        location.longitude &&
        destination &&
        destination &&
        pickup
      )
    )
      return res.status(404).json({ msg: "Location not provided" });

    const existingDetaiLs = await driver.findOne({ email: req.user.email });

    if (existingDetaiLs)
      return res.status(300).json({
        msg: "Your have an existing ride, please complete it",
      });

    const details = {
      email: req.user.email,
      location: {
        lat: Number(location.latitude),
        lng: Number(location.longitude),
      },
      destination,
      pickup,
    };

    const saveDriverLocation = await driver.create(details);

    return res.status(201).json({ msg: "Location accepted" });
  } catch (error) {
    return res.status(500).json({ json: "Something went wrong" });
  }
};

module.exports = getDriverLocation;
