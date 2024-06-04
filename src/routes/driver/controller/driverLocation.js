const { driver } = require("../../../models/ride");
const user = require("../../../models/user");

const getDriverLocation = async (req, res) => {
  try {
    const location = req.body.location;
    const destination = req.body.destination;
    const User = await user.findOne({ email: req.user.email });
    if (!User) return res.status(404).json({ msg: "User not found" });
    if (!(location.lng && location.lat && destination.lng && destination.lat))
      return res.status(404).json({ msg: "Location not provided" });
    const existingDetaiLs = await driver.findOne({ email: req.user.email });
    if (existingDetaiLs)
      return res
        .status(300)
        .json({
          msg: "Your location and destination has already been accepted",
        });
    const details = {
      email: req.user.email,
      location: {
        lat: Number(location.lat),
        lng: Number(location.lng),
      },
      destination: {
        lng: Number(destination.lng),
        lat: Number(destination.lat),
      },
    };
    const saveDriverLocation = await driver.create(details);
    return res.status(201).json({ msg: "Location accepted" });
  } catch (error) {
    return res.json({ error: error });
  }
};

module.exports = getDriverLocation;
